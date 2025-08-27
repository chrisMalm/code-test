import { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { PrimeReactProvider } from "primereact/api";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Button, FormLabel } from "@mui/material";
interface Transactions {
  id: string;
  amount: number;
  type: transactionTypes;
  date: string;
  description: string;
}

type transactionTypes = "all" | "deposit" | "withdrawl";

const FilterData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [date, setDate] = useState<Nullable<(Date | null)[]>>(null);
  const [transactionType, setTransactionType] =
    useState<transactionTypes>("all");

  useEffect(() => {
    setLoading(true);
    const getTransactions = async () => {
      try {
        const res = await fetch("http://localhost:3002/transactions");
        const data = await res.json();

        setTransactions((...prev) => [...data]);
        setLoading(false);
      } catch (error) {
        console.error("error feching transactions", error);
      }
    };
    getTransactions();
  }, []);

  const filtredTransaction = useMemo(() => {
    return transactions.filter((tx) => {
      // om type inte e all så kolla om den loopade tx.type inte är transactiontype och
      // ta bort den ur listan
      if (transactionType !== "all" && tx.type !== transactionType)
        return false;
      if (date && date[0] && date[1]) {
        // filtrera på datum, konvertera till javascript date object och ta bort dom datum i listan
        const txDate = new Date(tx.date);
        const startDate = date[0];
        const endDate = date[1];
        if (txDate < startDate || txDate > endDate) {
          return false;
        }
      }
      return true;
    });
  }, [transactions, transactionType, date]);

  if (loading) {
    return <div>...loading</div>;
  }
  const handleReset = () => {
    setDate(null);
    setTransactionType("all");
  };

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <p>💳 Transaktionsfilter med typ & datum (npm run transaction)</p>
        <p>
          Transaktioner hämtas från en lokal JSON-server och visas i en tabell.
          Du kan filtrera resultaten baserat på typ (<strong>deposit</strong>{" "}
          eller <strong>withdrawal</strong>) och ett datumintervall.
        </p>
        <p>
          Filtreringen sker direkt i webbläsaren med <code>useMemo</code> för
          bättre prestanda. Kalendern använder PrimeReact och tabellen visas med
          Material UI.
        </p>
      </Box>
      <Box
        sx={{
          marginTop: "2rem",
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-end",
        }}
      >
        <FormControl sx={{ minWidth: "200px" }}>
          <FormLabel sx={{ color: "white" }}>Filter on Type</FormLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={transactionType}
            label=" Filter on type"
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <MenuItem sx={{ color: "black" }} value="all">
              All
            </MenuItem>
            <MenuItem sx={{ color: "black" }} value="withdrawl">
              Withdrawl
            </MenuItem>
            <MenuItem sx={{ color: "black" }} value="deposit">
              Deposit
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: "250px", zIndex: "100" }}>
          <FormLabel sx={{ color: "white" }}>Filter on date</FormLabel>
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value)}
            selectionMode="range"
            readOnlyInput
            hideOnRangeSelection
            onShow={() => setCalendarOpen(true)}
            onHide={() => setCalendarOpen(false)}
            style={{ width: "100%" }}
            inputStyle={{
              height: "45px",
              padding: "0 1rem",
              color: "black",
              backgroundColor: "white",
              fontSize: "1rem",
            }}
          />
        </FormControl>
        <Button
          variant="outlined"
          sx={{
            height: "56px",
            background: "white",
            color: "black",
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>

      {filtredTransaction.length < 1 ? (
        <Box sx={{ paddingTop: "2rem" }}>
          {" "}
          Inga transactioner inom den datum intervallen
        </Box>
      ) : (
        <PrimeReactProvider>
          <Box className="AAA">
            <br />

            <br />
            <TableContainer
              component={Paper}
              sx={{ marginTop: calendarOpen ? "15rem" : "2rem" }}
            >
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtredTransaction.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {transaction.id}
                      </TableCell>
                      <TableCell align="right">{transaction.amount}</TableCell>
                      <TableCell align="right">{transaction.type}</TableCell>
                      <TableCell align="right">{transaction.date}</TableCell>
                      <TableCell align="right">
                        {transaction.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </PrimeReactProvider>
      )}
    </>
  );
};

export default FilterData;
