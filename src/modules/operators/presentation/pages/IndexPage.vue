<template>
  <q-page class="q-px-lg q-pt-sm">
    <section class="q-px-lg q-pt-lg q-pb-md">
      <h1 class="text-semibold" style="font-size: clamp(1.6em, 2vw, 2em)" v-text="'Operadores'" />
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
            >Filtrar operadores</q-tooltip>

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
          color="app-secondary"
          v-if="authStore.GetIsSuperAdmin"
          class="q-ml-sm text-app-primary text-semi-bold px-10 br-4"
        >
          <q-icon name="add_circle" size="1.5em" class="q-mr-sm" />
          Crear operador
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
            titleFilter="Filtrar operadores"
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
      tabindex="0"
      table-header-class="bg-app-primary-700 br-8 text-semi-bold"
      :rows="rows"
      :rows-per-page-options="[5, 10, 15, 20, 25, 30]"
      :columns="(columns as any)"
      :pagination-label="
        (firstRowIndex, endRowIndex, totalRowsNumber) => {
          return `${firstRowIndex}-${endRowIndex} de ${totalRowsNumber}`;
        }
      "
      row-key="id"
      dark
      rows-per-page-label="Operadores por página"
      @request="onRequest"
      v-model:pagination="paginationTable"
      no-data-label="Sin datos para mostrar."
      :filter="search"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="image" :props="props">
            <img :src="props.row.image" alt="image" style="height: 30px; width: 30px;" />
          </q-td>
          <q-td
            style="max-width: 150px; word-wrap: break-word !important;"
            key="name"
            :props="props"
          >
            {{ props.row.name }}
          </q-td>
          <q-td key="bgColor" :props="props">
            {{ props.row.bgColor }}
          </q-td>
          <q-td key="date" :props="props">
            {{ props.row.createdAt }}
          </q-td>
          <q-td key="actions" class="q-gutter-x-md" :props="props">
            <q-btn
              icon="o_visibility" class="text-aut-grayscale-subtitle" dense round flat />
            <q-btn
              icon="o_delete" class="text-aut-grayscale-subtitle" dense round flat  @click="ActivateDialog(props.row.id, 'delete')" />
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.enable ? 'Activo' : 'Inactivo' }}
            <q-toggle class="app-switch" :class="{ 'app-switch--active' : props.row.enable, 'app-switch--inactive' : !props.row.enable }"
                      v-model="props.row.enable" @update:model-value="ActivateDialog(props.row.id, 'status')" />
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
    </q-table>

    <q-dialog :maximized="$q.screen.lt.sm"
              persistent :position="$q.screen.gt.sm ? 'standard' : 'bottom'" v-model="confirmStatus">
      <ConfirmDialogComponent
        :loadingDialog="loadingStatus"
        @onYes="ChangeStatusFn"
        icon="o_dangerous"
        @onNo="RevertStatus"
        :title="rows.find((e) => e.id === currentId)?.name"
        :caption="`¿Estás seguro que deseas cambiar el estado del operador '${rows.find((e) => e.id === currentId)?.name}'?`"
      />
    </q-dialog>

    <q-dialog :maximized="$q.screen.lt.sm" persistent :position="$q.screen.gt.sm ? 'standard' : 'bottom'" v-model="confirmDelete">
      <ConfirmDialogComponent
        :loadingDialog="loadingDelete"
        @onYes="DeleteItem"
        @onNo="() => {
          confirmDelete = false;
          currentId = null;
        }"
        yes-btn-text="Borrar operador"
        icon="o_delete_forever"
        :title="rows.find((e) => e.id === currentId)?.name"
        :caption="`Al eliminar al operador '${rows.find((e) => e.id === currentId)?.name}',
        este ya no podrá iniciar sesión en el panel administrativo ni conectarse al servicio.`"
      />
    </q-dialog>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FilterOption, ITablePagination } from '@common/interfaces';
import { ConfirmDialogComponent, FilterDialogComponent } from '@common/components';
import { Router, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NotifyFn } from '@common/utils/notify.util';
import { NotificationEnum } from '@common/constants';
import { useAuthStore } from '@modules/auth/domain/store';
import { IOperator } from '@modules/operators/infrastructure/interfaces';

// IMMUTABLES
const $router: Router = useRouter();
const { t } = useI18n({ useScope: 'global' });
const authStore = useAuthStore();

// FOR THE TABLE
const columns = [
  {
    name: 'image',
    required: true,
    label: 'Logo',
    align: 'left',
    field: 'image',
    sortable: false
  },
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: 'name',
    sortable: false
  },
  {
    name: 'bgColor',
    required: true,
    label: 'Color del fondo',
    align: 'left',
    field: 'bgColor',
    sortable: false
  }, {
    name: 'date',
    required: true,
    label: 'Fecha de creación',
    align: 'left',
    field: 'date',
    sortable: false
  },
  {
    name: 'actions',
    required: true,
    label: 'Acciones',
    field: 'actions',
    align: 'left',
    sortable: false
  },
  {
    name: 'status',
    required: true,
    label: 'Estado',
    align: 'left',
    field: 'status',
    sortable: false
  }
];
const loadingPagination = ref<boolean>(false);
const rows = ref<IOperator[]>([]);
const paginationTable = ref<ITablePagination>({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 5,
  offset: 0
});
const search = ref<string>('');

// MISCELLANEOUS
const currentId = ref<string | null>(null);

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
const confirmStatus = ref<boolean>(false);
const confirmDelete = ref<boolean>(false);
const loadingStatus = ref<boolean>(false);
const loadingDelete = ref<boolean>(false);


// FUNCTIONS
const ChangeStatusFn = async(): Promise<void> =>
{
  const item: IOperator | null = rows.value.find(
    (e) => e.id === currentId.value
  );
  try
  {
    loadingStatus.value = true;
    // TODO: Request goes here
    NotifyFn(
      NotificationEnum.SUCCESS,
      '¡Todo listo!',
      3000,
      'El estado del operador fue cambiado exitosamente.'
    );
    confirmStatus.value = false;
    loadingStatus.value = false;
  }
  catch (err:  any)
  {
    loadingStatus.value = false;
    NotifyFn(
      NotificationEnum.ERROR,
      t(`BackMessages.${err?.response?.data.errorCode}.title`),
      8000,
      t(`BackMessages.${err?.response?.data.errorCode}.caption`)
    );
  }
};

const DeleteItem = async(): Promise<void> =>
{
  try
  {
    loadingDelete.value = true;
    // TODO: Request goes here
    NotifyFn(
      NotificationEnum.SUCCESS,
      '¡Todo listo!',
      3000,
      'El operador fue eliminado exitosamente.'
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
  id: string,
  dType: 'status' | 'delete'
): void =>
{
  confirmStatus.value = dType === 'status';
  confirmDelete.value = dType === 'delete';
  currentId.value = id;
};

const RevertStatus = (): void =>
{
  confirmStatus.value = false;
  const index: number = rows.value.findIndex((e) => e.id === currentId.value);
  if (index > -1)
  {
    setTimeout(() =>
    {
      rows.value[index].enable = !rows.value[index].enable;
    }, 300);
  }
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
    rows.value = [];
    loadingPagination.value = true;
    showBadge.value = Object.keys(filter || {}).length > 0;
    // request goes here
    const data: IOperator[] = [];
    for (let i = 0; i < 20; i++)
    {
      data.push({
        id: (i + rows.value.length).toString(),
        name: `Operador ${  i + rows.value.length}`,
        bgColor: `Color ${  i + rows.value.length}`,
        createdAt: '20/05/2021',
        enable: true,
        image: 'https://images.unsplash.com/photo-1714212494809-555606435baa?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      });
    }
    const pagination = {
      currentPage: paginationTable.value.page,
      limit: 20,
      total: 100
    };
    rows.value = data;
    paginationTable.value.rowsNumber = pagination.total;
    paginationTable.value.rowsPerPage = pagination.limit;
    paginationTable.value.page = pagination.currentPage;
    paginationTable.value.sortBy = sort as 'desc' | 'asc';
    paginationTable.value.descending = sortOrder;
    loadingPagination.value = false;
  }
  catch (err: any)
  {
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
  await GetItems(20, 0, '', null);
});
</script>
