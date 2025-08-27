import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { TypeCategory, Category, Items } from "../types";
import { getUniqueCategoriesByType } from "../utils/filterHelper";
import { typeCategories, InitCategories } from "../config/categoryConfig";

const MultiFilterData = () => {
  const [categories, setCategories] = useState<Category[]>(InitCategories);
  const [selectedCatType, setSelectedCatType] = useState<TypeCategory>("all");
  const [selectedCat, setSelectedCat] = useState<Category>();
  const [filteredItems, setFiltredItems] = useState<Items[]>([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch("http://localhost:3001/items");

        const data = await res.json();
        setFiltredItems((prev) => [...prev, ...data]);
      } catch (error) {
        console.log(error, "error");
      }
    };
    getItems();
  }, []);

  //   kör usememo varje gång filteredItems, selectedCatType el selectedCat ändras
  const filterItemsOnChange = useMemo(() => {
    // Om både typ och kategori är "all"/undefined → returnera allt
    if (selectedCatType === "all" && !selectedCat) return filteredItems;

    return filteredItems.filter((item) => {
      // Här behöver både matchtype o matchCategory vara true vid varje
      //  iteration för att spara dom i listan
      // om type e all blir matchType true
      const matchType =
        selectedCatType === "all" || item.type === selectedCatType;
      console.log(matchType, "type");

      // om det inte finns nån cat vald returnera true
      const matchCategory = !selectedCat || item.category === selectedCat;
      console.log(matchCategory, "cat");

      return matchType && matchCategory;
    });
  }, [filteredItems, selectedCatType, selectedCat]);

  const handleClickCat = (category: Category) => {
    if (selectedCat === category) {
      setSelectedCat(undefined); // Avmarkera
    } else {
      setSelectedCat(category);
    }
  };
  const handleClickType = (catType: TypeCategory) => {
    //  selectedCatType är all från start, trycker jag på någon annan type tas all bort från
    //  selectedCatType listan som alltid ska innehålla en sträng
    if (catType === "all") {
      setCategories(InitCategories);
      setSelectedCat(undefined);
      setSelectedCatType("all");
    } else if (selectedCatType === catType) {
      setSelectedCatType("all"); // toggla tillbaka till all
      // sätt ursprungs listan pga när du klickar ur en cat type blir det all igen
      setCategories(InitCategories);
    } else {
      setSelectedCatType(catType);
      setSelectedCat(undefined); // 🧹 Rensa vald kategori, eftersom jag bytt typ

      // filtrera på cat type och uppdatera categories, ex om type är accessories ta bort dom
      // item som inte har accessories

      // Filtrera items för att hitta unika kategorier som tillhör catType
      // i getUniqueCategoriesByType: new set tar bort dubletter då blir det ett object
      //  sen med Array.from blir det en array igen som jag kan loopa över
      setCategories(getUniqueCategoriesByType(filteredItems, catType));
    }
  };
  return (
    <>
      <Box sx={{ marginBottom: "2rem" }}>
        <h1>Multifiltrering från JSON-server (npm run multifilter )</h1>
        <p>
          Denna komponent hämtar data från en lokal JSON-server och låter dig
          filtrera resultatet baserat på både typ och kategori.
        </p>
        <p>
          Filtreringen sker direkt i frontend med <code>useMemo</code> för att
          optimera prestanda vid varje valändring.
        </p>
      </Box>

      {/* Multi filter boxes   */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))"
        gap={2}
        width="100%"
        paddingBottom={2}
        justifyItems="center"
      >
        {typeCategories.map((type, index) => (
          <Button
            key={index}
            fullWidth
            sx={{
              color: selectedCatType?.includes(type) ? "red" : "black",
            }}
            onClick={() => handleClickType(type)}
          >
            {type}
          </Button>
        ))}
      </Box>
      <Box
        borderTop={1}
        paddingTop={2}
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))"
        gap={2}
        width="100%"
        justifyItems="center"
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            fullWidth
            sx={{ color: selectedCat === category ? "red" : "black" }}
            onClick={() => handleClickCat(category)}
          >
            {category}
          </Button>
        ))}
      </Box>
      {/* filter outcome  */}
      <Box
        marginTop={8}
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={2}
        width="100%"
      >
        {filterItemsOnChange?.map((item, index) => (
          <Card key={index}>
            <CardContent>
              <Typography sx={{ color: "black", padding: "1rem" }}>
                {item.name}
              </Typography>
              <Typography sx={{ color: "black", padding: "1rem" }}>
                {item.category}
              </Typography>
              <Typography sx={{ color: "black", padding: "1rem" }}>
                {item.type}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default MultiFilterData;
