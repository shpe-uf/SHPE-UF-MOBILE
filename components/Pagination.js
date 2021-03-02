import * as React from 'react';
import { DataTable } from 'react-native-paper';

const itemsPerPage = 5;

const MyComponent = ({items}) => {
  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  return (
    <DataTable>
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.floor(items.length / itemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
      />
    </DataTable>
  );
};

export default MyComponent;
