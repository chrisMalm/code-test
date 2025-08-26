import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchItems } from "../store/items/itemsSlice";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import PaginationMui from "@mui/material/Pagination";

const Pagination = () => {
  // dispatch uppdaterar redux state
  const dispatch = useAppDispatch();

  //   Appselector hämtar värden från redux store
  const { items, total, currentPage, loading, error } = useAppSelector(
    (state) => state.items
  );

  const itemsPerPage = 10;
  //   total är antal items object, hämtat från headers X-Total-count
  // pagecoutn är hur många sidor pagination mui komponenten ska ha
  const pageCount = Math.ceil(total / itemsPerPage);

  useEffect(() => {
    dispatch(fetchItems(1));
  }, []);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    console.log("page change");

    dispatch(fetchItems(newPage));
  };
  return (
    <div>
      {loading && <div>...loading</div>}
      {error && (
        <div>{`${error} for some stupid reason 
        `}</div>
      )}
      <div style={{ padding: "2rem 0rem" }}>
        <h1>Paginering för snabbare laddning</h1>
        <p>
          Data hämtas från en PostgreSQL-databas via ett Node.js och
          Express-backend, med Redux Thunk för API-anrop.
        </p>
        <p>
          Varje sida hämtar 10 rader med <code>LIMIT</code> och hoppar över
          rader från tidigare sidor med <code>OFFSET</code>.
        </p>
      </div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {items &&
          items.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.category}</Typography>
                  <Typography>{item.type}</Typography>
                </CardContent>
              </Card>{" "}
            </Grid>
          ))}
      </Grid>
      <Box mt={2} display="flex" justifyContent="center">
        <PaginationMui
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </div>
  );
};

export default Pagination;
