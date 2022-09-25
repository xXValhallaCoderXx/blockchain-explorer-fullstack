import { useMemo } from "react";
import { Box, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "tag", headerName: "Tag", editable: true },
  {
    field: "date",
    headerName: "Date",
    width: 180,
    valueGetter: (params) =>
      `${format(new Date(params.row.date), "yyyy-MM-dd  HH:mm:ss")}`,
  },
  {
    field: "from",
    headerName: "Source",
    width: 200,
  },
  {
    field: "to",
    headerName: "Destination",
    width: 200,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 110,
  },
  {
    field: "direction",
    headerName: "Direction",
    description: "This column has a value getter and is not sortable.",
    renderCell: (params) => {
      return (
        <dispatchEvent index={params.row.id}>
          {params.row.direction === "sending" ? (
            <Chip
              sx={{ width: 50, height: 25, backgroundColor: "#edd0de" }}
              label="Out"
            />
          ) : (
            <Chip
              sx={{ width: 50, height: 25, backgroundColor: "#D1EFEA" }}
              label="In"
            />
          )}
        </dispatchEvent>
      );
    },

    width: 110,
  },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 1 },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const TaggedListContainer = ({ data, selectedWallets }) => {
  console.log("DATA: ", data);
  const computedTableData = useMemo(() => {
    let flatData = [];
    selectedWallets.forEach((address, index) => {
      const parsedWallets = data[address].map((wallet) => wallet);
      flatData.push(...parsedWallets);
    });

    const indexItems = flatData.map((wallet, index) => {
      return {
        id: wallet.tx_hash,
        type: "",
        ...wallet,
      };
    });

    const sortDates = indexItems.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return sortDates;
  }, [data]);

  return (
    <Box pt={5}>
      <Box sx={{ height: 400, width: 760 }}>
        <DataGrid
          rows={computedTableData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Box>
  );
};

export default TaggedListContainer;
