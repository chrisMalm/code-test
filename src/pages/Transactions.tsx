// import { useEffect, useMemo } from "react";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
// import { fetchTransactions } from "../store/transactions/transactionsSlice";
// import TransactionList from "../components/TransactionList";
// import { Box } from "@mui/material";

// const Transactions = () => {
//   const dispatch = useAppDispatch();
//   const { transactions } = useAppSelector((state) => state.transactions);

//   useEffect(() => {
//     dispatch(fetchTransactions());
//   }, [dispatch]);

//   const userOneTransactions = useMemo(() => {
//     // filtrerar på user 1s transactions
//     return transactions.filter((transaction) => transaction.user_id === 1);
//   }, [transactions]);

//   const userTwoTransactions = useMemo(() => {
//     return transactions.filter((transaction) => transaction.user_id === 2);
//   }, [transactions]);

//   return (
//     <Box className="flex flex-col justify-center items-center">
//       <Box sx={{ padding: "2rem 0rem" }}>
//         <h1>
//           Denna komponent ansvarar för att hämta transaktioner via Redux
//           (createAsyncThunk) genom att dispatcha `fetchTransactions` vid
//           komponentens mount.
//         </h1>
//         <p>
//           Transaktionerna filtreras därefter för två olika användare (user_id 1
//           och 2) och renderas i två listor via `TransactionList`-komponenten.
//         </p>
//         <p>
//           {" "}
//           useEffect: Initierar hämtning av data från API. useMemo: Filtrerar
//           transaktioner per användare för att optimera rendering. Redux: Global
//           state hantering med loading- och errorstatus.
//         </p>
//       </Box>
//       <Box
//         display="flex"
//         className="AAA"
//         // flexDirection={{ xs: "column", md: "row" }}
//       >
//         {/* sätter user 1 o 2 under varandra  */}
//         <Box className="BBB">
//           <TransactionList transactions={userOneTransactions} />
//           <TransactionList transactions={userTwoTransactions} />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Transactions;
export {};
