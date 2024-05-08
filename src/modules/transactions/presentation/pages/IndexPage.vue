<template>
  <q-page class="q-px-lg q-pt-sm">
    <section class="q-px-lg q-pt-lg q-pb-md">
      <h1 class="text-semibold" style="font-size: clamp(1.6em, 2vw, 2em)" v-text="'Apuestas'" />
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
          class="q-ml-sm stylesBtn px-10"
          @click="filterDialog = true"
        >
          <q-icon name="filter_list_alt" size="2em" />
          <q-tooltip
            anchor="bottom middle"
            :offset="[30, 5]"
            class="bg-app-tertiary"
          >Filtrar apuestas</q-tooltip>

          <q-badge
            v-if="showBadge"
            color="app-danger"
            floating
            style="padding: 4px 4px; min-height: 6px; top: 6px; right: 0px"
          />
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
            titleFilter="Filtrar apuestas"
            statusProperty="Hipódromo"
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
      rows-per-page-label="Registros por página"
      @request="onRequest"
      v-model:pagination="paginationTable"
      no-data-label="Sin datos para mostrar."
      :filter="search"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" style="max-width: 30px !important;" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td
            style="max-width: 150px; word-wrap: break-word !important;"
            key="user"
            :props="props"
          >
            {{ props.row.userId }}
          </q-td>
          <q-td key="hippodrome" :props="props">
            {{ props.row.hippodrome }}
          </q-td>
          <q-td key="combinations" :props="props">
            {{ props.row.combinations }}
          </q-td>
          <q-td key="amount" :props="props">
            {{ props.row.amount.toLocaleString('de-DE', { minimumFractionDigits: 2 }) }} {{ props.row.currency }}
          </q-td>
          <q-td key="date" :props="props">
            {{ props.row.createdAt }}
          </q-td>
          <q-td key="actions" class="q-gutter-x-md" :props="props">
            <q-btn
              icon="o_visibility" class="text-aut-grayscale-subtitle" dense round flat />
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
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FilterOption, ITablePagination } from '@common/interfaces';
import { FilterDialogComponent } from '@common/components';
import { useI18n } from 'vue-i18n';
import { NotifyFn } from '@common/utils/notify.util';
import { NotificationEnum } from '@common/constants';
import { useAuthStore } from '@modules/auth/domain/store';
import { ITransaction } from '@modules/transactions/infrastructure/interfaces';

// IMMUTABLES
const { t } = useI18n({ useScope: 'global' });
const authStore = useAuthStore();

// FOR THE TABLE
const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID de transacción',
    align: 'left',
    field: 'id',
    sortable: false
  },
  {
    name: 'user',
    required: true,
    label: 'Usuario',
    align: 'left',
    field: 'user',
    sortable: false
  },
  {
    name: 'hippodrome',
    required: true,
    label: 'Hipódromo',
    align: 'left',
    field: 'hippodrome',
    sortable: false
  },
  {
    name: 'combinations',
    required: true,
    label: 'Combinaciones',
    align: 'left',
    field: 'combinations',
    sortable: false
  },
  {
    name: 'amount',
    required: true,
    label: 'Monto apostado',
    align: 'left',
    field: 'amount',
    sortable: false
  },
  {
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
const rows = ref<ITransaction[]>([]);
const paginationTable = ref<ITablePagination>({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 5,
  offset: 0
});
const search = ref<string>('');


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


// FUNCTIONS
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
    const data: ITransaction[] = [];
    for (let i = 0; i < 20; i++)
    {
      data.push({
        id: (i + rows.value.length).toString(),
        userId: `user ${(i + rows.value.length).toString()}`,
        hippodrome: 'Finger Lakes', currency: '',
        combinations: i,
        currency: 'VES',
        amount: 1000,
        createdAt: '20/05/2021'
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
