<template>
  <q-page class="q-px-lg q-pt-sm">
    <section class="q-px-lg q-pt-lg q-pb-md">
      <h1 class="text-semibold" style="font-size: clamp(1.6em, 2vw, 2em)" v-text="'Usuarios'" />
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <q-input
            color="app-secondary"
            dense
            borderless
            class="br-8"
            style="width: 300px; background: #f6ecf3 !important; padding: 0 10px"
            debounce="300"
            v-model="search"
            placeholder="¿Qúe buscas?"
          >
            <template v-slot:prepend>
              <q-icon color="app-primary" name="search" />
            </template>
          </q-input>
          <q-btn
            flat
            v-if="authStore.GetIsSuperAdmin"
            class="q-ml-sm stylesBtn px-10"
            @click="filterDialog = true"
          >
            <q-icon name="filter_list_alt" size="2em" />
            <q-tooltip
              anchor="bottom middle"
              :offset="[30, 5]"
              class="bg-app-tertiary"
            >Filtrar usuarios</q-tooltip
            >

            <q-badge
              v-if="showBadge"
              color="app-danger"
              floating
              style="padding: 4px 4px; min-height: 6px; top: 6px; right: 0px"
            />
          </q-btn>
        </div>
        <q-btn
          unelevated
          @click="() => $router.push('/usuarios/crear')"
          color="app-secondary"
          class="q-ml-sm text-app-primary text-semi-bold px-10 br-4"
        >
          <q-icon name="add_circle" size="1.5em" class="q-mr-sm" />
          Crear usuario
        </q-btn>

        <q-dialog
          class="hp-100 no-padding-dialog bl-checkbox"
          v-model="filterDialog"
          maximized
          transition-show="slide-left"
          transition-hide="slide-right"
          position="right"
        >
          <FilterDialogComponent
            titleFilter="Filtrar usuarios"
            statusProperty="Proveedor"
            :optionsFilter="options"
            :filtersToApply="filtersToApply"
            @closeFilter="filterDialog = false"
            @clearFilters="ClearFilters"
            @checkFilter="() => {}"
            @applyFilters="ApplyFilters"
          />
        </q-dialog>
      </div>
    </section>
    <q-table
      class="br-8 bg-transparent text-white q-mx-lg"
      ref="tableRef"
      :loading="loadingPagination"
      flat
      wrap-cells
      color="app-secondary"
      tabindex="0"
      table-header-class="bg-app-primary-700 br-8 text-semi-bold"
      :rows="rows"
      :rows-per-page-options="[5, 10, 15, 20, 25, 30]"
      :columns="(getColumns as any)"
      :pagination-label="
        (firstRowIndex, endRowIndex, totalRowsNumber) => {
          return `${firstRowIndex}-${endRowIndex} de ${totalRowsNumber}`;
        }
      "
      row-key="id"
      dark
      rows-per-page-label="Usuarios por página"
      @request="onRequest"
      v-model:pagination="paginationTable"
      no-data-label="Sin datos para mostrar."
      :filter="search"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            style="max-width: 150px; word-wrap: break-word !important;"
            key="name"
            :props="props"
          >
            {{ props.row.nombre.concat(' ', props.row.apellido) }}
          </q-td>
          <q-td key="phone" :props="props">
            {{ props.row.tlf ? parsePhoneNumberFromString(props.row.tlf, '+58').formatInternational() : '-' }}
          </q-td>
          <q-td key="createdAt" :props="props">
            {{ ParseDate(false, props.row.creado, 'DD/MM/YYYY') }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="provider" v-if="authStore.GetIsSuperAdmin" :props="props">
            proveedor
          </q-td>
          <q-td key="actions" class="q-gutter-x-md" :props="props">
            <q-btn
              icon="o_edit" class="text-aut-grayscale-subtitle" @click="$router.push(`/usuarios/editar/${props.row.id}`)" dense round flat />
            <q-btn
              icon="o_delete" class="text-aut-grayscale-subtitle" dense round flat  @click="ActivateDialog(props.row.id, 'delete')" />
          </q-td>
        </q-tr>
      </template>

      <template v-slot:no-data>
        <div
          class="full-width row flex-center text-grey-6 text-semi-bold q-pt-md q-gutter-sm"
        >
          No se encontraron registros
        </div>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="app-primary" />
      </template>
    </q-table>

    <q-dialog :maximized="$q.screen.lt.sm" persistent :position="$q.screen.gt.sm ? 'standard' : 'bottom'" v-model="confirmDelete">
      <ConfirmDialogComponent
        :loadingDialog="loadingDelete"
        @onYes="DeleteItem"
        @onNo="() => {
          confirmDelete = false;
          currentId = null;
        }"
        yes-btn-text="Borrar usuario"
        :title="rows.find((e) => e.id === currentId)?.nombre?.concat(' ', rows.find((e) => e.id === currentId)?.apellido)"
        :caption="`Al eliminar al usuario '${rows.find((e) => e.id === currentId)?.nombre?.concat(' ', rows.find((e) => e.id === currentId)?.apellido)}',
        este ya no podrá iniciar sesión en el panel administrativo.`"
        icon="o_delete_forever"
      />
    </q-dialog>
  </q-page>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { FilterOption, ITablePagination } from '@common/interfaces';
import { IUser } from '@modules/users/infrastructure/interfaces';
import { ConfirmDialogComponent, FilterDialogComponent } from '@common/components';
import { useI18n } from 'vue-i18n';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { NotifyFn } from '@common/utils/notify.util';
import { NotificationEnum } from '@common/constants';
import { useAuthStore } from '@modules/auth/domain/store';
import { DeleteUserUseCase, ListUseCase } from '@modules/users/domain/useCases';
import { AxiosError } from 'axios';
import { ParseDate } from '../../../../common/utils';

// IMMUTABLES
const { t } = useI18n({ useScope: 'global' });
const authStore = useAuthStore();

// FOR THE TABLE
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre y Apellido',
    align: 'left',
    field: 'name',
    sortable: false
  },
  {
    name: 'phone',
    required: true,
    label: 'No. de teléfono',
    align: 'left',
    field: 'phone',
    sortable: false
  },
  {
    name: 'createdAt',
    required: true,
    label: 'Fecha de creación',
    align: 'left',
    field: 'createdAt',
    sortable: false
  }, {
    name: 'email',
    required: true,
    label: 'Correo',
    align: 'left',
    field: 'email',
    sortable: false
  },
  {
    name: 'actions',
    required: true,
    label: 'Acciones',
    field: 'actions',
    align: 'left',
    sortable: false
  }
];
const columnsFAdmin = [
  {
    name: 'name',
    required: true,
    label: 'Nombre y Apellido',
    align: 'left',
    field: 'name',
    sortable: false
  },
  {
    name: 'phone',
    required: true,
    label: 'No. de teléfono',
    align: 'left',
    field: 'phone',
    sortable: false
  },
  {
    name: 'createdAt',
    required: true,
    label: 'Fecha de creación',
    align: 'left',
    field: 'createdAt',
    sortable: false
  }, {
    name: 'email',
    required: true,
    label: 'Correo',
    align: 'left',
    field: 'email',
    sortable: false
  },
  {
    name: 'provider',
    required: true,
    label: 'Proveedor',
    align: 'left',
    field: 'provider',
    sortable: false
  },
  {
    name: 'actions',
    required: true,
    label: 'Acciones',
    field: 'actions',
    align: 'left',
    sortable: false
  }
];
const loadingPagination = ref<boolean>(false);
const rows = ref<IUser[]>([]);
const paginationTable = ref<ITablePagination>({
  sortBy: 'creado',
  descending: false,
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 5,
  offset: 0
});
const search = ref<string>('');

// MISCELLANEOUS
const currentId = ref<number | null>(null);

// FILTERS
const showBadge = ref<boolean>(false);
const filterDialog = ref<boolean>(false);
// TODO: BRING THIS OPTIONS FROM BACKEND
const options: FilterOption[] = [
  {
    label: 'Apuestas Royal',
    value: 'APUESTAS ROYAL',
    disable: false
  },
  {
    label: 'Polla Royal',
    value: 'POYA ROYAL',
    disable: false
  }
];
const filtersToApply = ref<string[]>([]);

// BOOLEANS
const confirmDelete = ref<boolean>(false);
const loadingDelete = ref<boolean>(false);

// GETTERS
const getColumns = computed(() => authStore.GetIsSuperAdmin ? columnsFAdmin : columns);

// FUNCTIONS
const DeleteItem = async(): Promise<void> =>
{
  try
  {
    loadingDelete.value = true;
    await DeleteUserUseCase.handle(currentId.value);
    NotifyFn(
      NotificationEnum.SUCCESS,
      '¡Todo listo!',
      3000,
      'El usuario fue eliminado exitosamente.'
    );
    confirmDelete.value = false;
    rows.value = rows.value.filter((item) => item.id !== currentId.value);
    loadingDelete.value = false;
  }
  catch (err: any)
  {
    loadingDelete.value = false;
    NotifyFn(
      NotificationEnum.ERROR,
      t(`BackMessages.${err?.response?.data.errorCode}.title`),
      8000,
      t(`BackMessages.${err?.response?.data.errorCode}.caption`)
    );
  }
};

const ActivateDialog = (
  id: number,
  dType: 'status' | 'delete'
): void =>
{
  confirmDelete.value = dType === 'delete';
  currentId.value = id;
};

const GetItems = async(
  limit?: number,
  offset?: number,
  searchV?: string,
  filter?: object | null,
  sort?: string,
  sortOrder?: boolean
): Promise<void> =>
{
  try
  {
    loadingPagination.value = true;
    showBadge.value = Object.keys(filter || {}).length > 0;
    const { data } = await ListUseCase.handle({
      pagination: {
        limit,
        ...(offset > 0 ? { offset } : {})
      },
      ...(searchV ? { filter: { search: searchV } } : {}),
      sort,
      sortOrder
    });
    rows.value = data.data;
    paginationTable.value.rowsNumber = data.pagination.total;
    paginationTable.value.rowsPerPage = data.pagination.limit;
    paginationTable.value.page = data.pagination.total / (offset + data.data.length);
    paginationTable.value.sortBy = sort;
    paginationTable.value.descending = sortOrder;
    loadingPagination.value = false;
  }
  catch (err: AxiosError | any)
  {
    console.log(err);
    loadingPagination.value = false;
    NotifyFn(
      NotificationEnum.ERROR,
      t(`BackMessages.${err?.response?.data.errorCode}.title`),
      8000,
      t(`BackMessages.${err?.response?.data.errorCode}.caption`)
    );
  }
};

const ClearFilters = async(): Promise<void> =>
{
  filtersToApply.value = [];
  loadingPagination.value = true;
  showBadge.value = false;
  options.map((e) => (e.disable = false));
  filterDialog.value = false;
  await GetItems(paginationTable.value.rowsPerPage, 0, search.value, null);
};

const ApplyFilters = async(value): Promise<void> =>
{
  filterDialog.value = false;
  const filter = { provider: value.toString() };
  filtersToApply.value = value;
  await GetItems(paginationTable.value.rowsPerPage, 0, search.value, filter);
};

const onRequest = async(props: {
  pagination: ITablePagination;
}): Promise<void> =>
{
  const { page, rowsPerPage, rowsNumber, sortBy, descending } =
    props.pagination;
  loadingPagination.value = true;
  const offset =
    page > paginationTable.value.page
      ? rowsPerPage * page - rowsPerPage
      : page < 2
        ? 0
        : rowsNumber === rowsPerPage * page
          ? rowsNumber - rowsPerPage
          : rowsPerPage * page - rowsPerPage;
  await GetItems(rowsPerPage, offset, search.value, null, sortBy, descending);
  loadingPagination.value = false;
};

onMounted(async() =>
{
  await GetItems(20, 0, '', null, 'creado', false);
});
</script>
