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
        </div>
        <q-btn
          unelevated
          color="app-secondary"
          @click="$router.push('/operadores/crear')"
          class="q-ml-sm text-app-primary text-semi-bold px-10 br-4"
        >
          <q-icon name="add_circle" size="1.5em" class="q-mr-sm" />
          Crear operador
        </q-btn>
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
          <q-td
            style="max-width: 150px; word-wrap: break-word !important;"
            key="name"
            :props="props"
          >
            {{ props.row.nombre }}
          </q-td>
          <q-td
            style="max-width: 150px; word-wrap: break-word !important;"
            key="dbs"
            :props="props"
          >
            {{ props.row.dbs }}
          </q-td>
          <q-td key="url" :props="props">
            {{ props.row.url }}
          </q-td>
          <q-td key="hasBg" :props="props">
            {{ props.row.urlBg ? 'Sí' : 'No' }}
          </q-td>
          <q-td key="date" :props="props">
            {{ ParseDate(false, props.row.creado, 'DD/MM/YYYY HH:mm a', 'YYYY-MM-DD HH:mm:ss') }}
          </q-td>
          <q-td key="actions" class="q-gutter-x-md" :props="props">
            <q-btn
              icon="o_edit" class="text-aut-grayscale-subtitle" dense round flat />
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
        yes-btn-text="Borrar operador"
        icon="o_delete_forever"
        :title="rows.find((e) => e.id === currentId)?.nombre"
        :caption="`Al eliminar al operador '${rows.find((e) => e.id === currentId)?.nombre}',
        este ya no podrá iniciar sesión en el panel administrativo ni conectarse al servicio.`"
      />
    </q-dialog>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FilterOption, ITablePagination } from '@common/interfaces';
import { ConfirmDialogComponent } from '@common/components';
import { Router, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NotifyFn } from '@common/utils/notify.util';
import { NotificationEnum } from '@common/constants';
import { useAuthStore } from '@modules/auth/domain/store';
import { IOperator } from '@modules/operators/infrastructure/interfaces';
import { ListUseCase } from '@modules/operators/domain/useCases';
import { AxiosError } from 'axios';
import { ParseDate } from '@common/utils';

// IMMUTABLES
const $router: Router = useRouter();
const { t } = useI18n({ useScope: 'global' });
const authStore = useAuthStore();

// FOR THE TABLE
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: 'name',
    sortable: false
  },
  {
    name: 'dbs',
    required: true,
    label: 'DBS',
    align: 'left',
    field: 'dbs',
    sortable: false
  },
  {
    name: 'url',
    required: true,
    label: 'URL',
    align: 'left',
    field: 'url',
    sortable: false
  },
  {
    name: 'hasBg',
    required: true,
    label: 'Tiene fondo',
    align: 'left',
    field: 'hasBg',
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
const currentId = ref<number | null>(null);

// FILTERS
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


// FUNCTIONS
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
    loadingPagination.value = false;
    NotifyFn(
      NotificationEnum.ERROR,
      t(`BackMessages.${err?.response?.data.errorCode}.title`),
      8000,
      t(`BackMessages.${err?.response?.data.errorCode}.caption`)
    );
  }
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
