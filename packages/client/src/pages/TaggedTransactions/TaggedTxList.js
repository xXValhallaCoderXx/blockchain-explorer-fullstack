import { useMemo } from "react";
import { Grid, Chip, Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";

const columns = [
  { field: "id", headerName: "ID", editable: false },
  { field: "tag", headerName: "Tag", editable: false },
  {
    field: "date",
    headerName: "Date",
    width: 180,
    editable: false,
    valueGetter: (params) =>
      `${format(new Date(params.row.date), "yyyy-MM-dd  HH:mm:ss")}`,
  },
  {
    field: "from",
    headerName: "Source",
    width: 200,
    editable: false,
  },
  {
    field: "to",
    headerName: "Destination",
    width: 200,
    editable: false,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 110,
    editable: false,
  },
  {
    field: "direction",
    headerName: "Direction",
    editable: false,
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
    <Grid container pt={5}>
      <Grid item xs={12} lg={7}>
        <Card false sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={computedTableData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 15]}
            disableSelectionOnClick
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default TaggedListContainer;
