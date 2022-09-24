/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Typography, Box, Card, Grid, Button, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import EmptySearchContainer from "../../components/molecule/EmptySearch";
import AddTransactionTagModal from "./components/AddTransactionTagModal";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "type", headerName: "Tag", editable: true },
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

const TxListContainer = ({ data, selectedWallets }) => {
  const [parsedData, setParsedData] = useState([]);
  const [selectedTx, setSelectedTx] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taggedTx, setTaggedTx] = useState(false);

  useEffect(() => {
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

    setParsedData(sortDates);
  }, [data]);

  useEffect(() => {
    const hasTagged = parsedData.some((item) => item.type !== "");
    if (hasTagged) {
      setTaggedTx(true);
    } else {
      setTaggedTx(false);
    }
  }, [parsedData]);

  const handleOnClickCell = (x) => {
    if (selectedTx.includes(x.id)) {
      const filterArray = selectedTx.filter((item) => item !== x.id);
      setSelectedTx(filterArray);
    } else {
      const newData = [...selectedTx, x.id];
      setSelectedTx(newData);
    }
  };

  const handleSubmit = () => {};
  const onHandleClose = () => {
    setIsModalOpen(false);
  };

  const onClickAddTags = () => {
    setIsModalOpen(true);
  };

  const handleOnCellCommit = ({ id, field, value }, event) => {
    const updatedData = parsedData.map((tx) => {
      if (tx.id === id) {
        tx.type = value;
      }
      return tx;
    });
    setParsedData(updatedData);
  };

  if (parsedData.length === 0) {
    return (
      <EmptySearchContainer message="Please select which wallets to view in Overview" />
    );
  }
  console.log("PARSED DATA: ", parsedData)
  return (
    <Box>
      <Grid container sx={{ mt: 4, mb: 1 }}>
        <Grid item container xs={12} lg={9} xl={7}>
          <Grid item xs={9}>
            <Typography variant="body">
              Enter your own tags to save these transactions in your vault
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              onClick={onClickAddTags}
              disabled={!taggedTx}
              variant="outlined"
            >
              Add Tags
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} lg={9} xl={7}>
          <Card sx={{ height: 400 }}>
            <DataGrid
              rows={parsedData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 15]}
              onCellClick={handleOnClickCell}
              disableSelectionOnClick
              onCellEditCommit={handleOnCellCommit}
            />
          </Card>
        </Grid>
      </Grid>
      <AddTransactionTagModal
        isOpen={isModalOpen}
        onClose={onHandleClose}
        handleSubmit={handleSubmit}
        isLoading={false}
        data={parsedData}
      />
    </Box>
  );
};

export default TxListContainer;
