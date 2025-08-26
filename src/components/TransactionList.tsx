import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Transaction } from "../store/transactions/transactionsType";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../store/hooks";
import { deleteTransaction } from "../store/transactions/transactionsSlice";
import { Snackbar } from "@mui/material";
import { useState } from "react";

type Props = {
  transactions: Transaction[];
};

const TransactionList = ({ transactions }: Props) => {
  // tar in props som är user 1 eller 2s transactions
  const [open, setOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleRemove = (id: number) => {
    // deletar transaction via idet och redux state uppdateras
    // kör om transaction komponenten och props
    // uppdateras med borttagna transaction
    console.log(id, "idet");

    dispatch(deleteTransaction(id))
      // unwrap är return värdet från en metod i redux
      // kan vara fulfilled(lyckat) el kastar fel i rejected
      .unwrap()
      .then((res) => {
        console.log("deleted transaction:", res);

        setOpen(true);
      })
      .catch((err) => {
        console.error("Failed to delete transaction:", err);
        setErrorMsg(err);
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMsg(""); // reset error message
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMsg || "Removed transaction successfully"}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>
          User:{" "}
          {transactions.length > 0
            ? transactions[0].user_id
            : "Ingen användare"}
        </h2>{" "}
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: "0 2rem" }}
        >
          {transactions.map((trans) => (
            <Grid size={{ xs: 8, md: 6, lg: 4 }} key={trans.id}>
              <Card>
                <CardContent className="tets">
                  <p>ID: {trans.id}</p>
                  <p>User ID: {trans.user_id}</p>
                  <p>Typ: {trans.type}</p>
                  <p>
                    Datum:{" "}
                    {new Date(trans.transaction_date).toLocaleDateString()}
                  </p>
                  <p>Belopp: {trans.amount}</p>
                </CardContent>
                <Stack spacing={2} direction="row">
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleRemove(trans.id)}
                  >
                    Remove
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default TransactionList;
