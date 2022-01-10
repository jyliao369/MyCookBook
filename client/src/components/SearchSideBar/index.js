import React from "react";
import { useState } from "react";

// MUI COMPONENTS FOR LOGIN AND SIGNUP
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

const SearchSideBar = () => {
  const [comSchExpand, setcomExpand] = useState(false);
  const handleSchExpand = () => {
    setcomExpand(!comSchExpand);
  };
  const [reckeyExpand, setreckeyExpand] = useState(false);
  const handlerekeExpand = () => {
    setreckeyExpand(!reckeyExpand);
  };
  const [ingExpand, setingExpand] = useState(false);
  const handleingExpand = () => {
    setingExpand(!ingExpand);
  };

  return (
    <Box>
      <Paper>
        <Grid>
          <Typography sx={{ fontSize: 30 }}>
            <p>Filter</p>
          </Typography>
        </Grid>
        <Grid>
          <Grid>
            <Typography sx={{ fontSize: 20 }} onClick={handleSchExpand}>
              <p>Common Search</p>
            </Typography>
          </Grid>
          <Collapse in={comSchExpand}>
            <Grid>
              <Button
                variant="contained"
                value="Drinks"
                //   onClick={handlefilter}
                //   sx={{ fontSize: 13, m: 1 }}
              >
                Drinks
              </Button>
              <Button
                variant="contained"
                value="Appetizer"
                //   onClick={handlefilter}
                //   sx={{ fontSize: 13, m: 1 }}
              >
                Appetizers
              </Button>
              <Button
                variant="contained"
                value="Entree"
                //   onClick={handlefilter}
                //   sx={{ fontSize: 13, m: 1 }}
              >
                Entrees
              </Button>
              <Button
                variant="contained"
                value="Dessert"
                //   onClick={handlefilter}
                //   sx={{ fontSize: 13, m: 1 }}
              >
                Desserts
              </Button>
            </Grid>
            <Grid>
              <Button variant="contained">Breakfast</Button>
              <Button variant="contained">Brunch</Button>
              <Button variant="contained">Lunch</Button>
              <Button variant="contained">Dinner</Button>
              <Button variant="contained">Snacks</Button>
            </Grid>
            <Grid>
              <Button variant="contained">Chinese</Button>
              <Button variant="contained">German</Button>
              <Button variant="contained">Indian</Button>
              <Button variant="contained">Japanese</Button>
              <Button variant="contained">Russian</Button>
              <Button variant="contained">Thai</Button>
              <Button variant="contained">Filipino</Button>
              <Button variant="contained">Greek</Button>
              <Button variant="contained">Italian</Button>
              <Button variant="contained">Mexican</Button>
              <Button variant="contained">Spanish</Button>
              <Button variant="contained">Global</Button>
            </Grid>
            <Grid>
              <Button variant="contained">Gluten-Free</Button>
              <Button variant="contained">Low-Calorie</Button>
              <Button variant="contained">Low Cholesterol</Button>
              <Button variant="contained">Low Sodium</Button>
              <Button variant="contained">Low Carb</Button>
              <Button variant="contained">Low Fat</Button>
              <Button variant="contained">Keto Friendly</Button>
            </Grid>
            <Grid>
              <Button variant="contained">Baking</Button>
              <Button variant="contained">Frying</Button>
              <Button variant="contained">Roasting</Button>
              <Button variant="contained">Grilling</Button>
              <Button variant="contained">Steaming</Button>
              <Button variant="contained">Boiling</Button>
            </Grid>
          </Collapse>
        </Grid>
        <Grid>
          <Grid>
            <Typography sx={{ fontSize: 20 }} onClick={handlerekeExpand}>
              <p>Recipe or Keyword</p>
            </Typography>
          </Grid>
          <Collapse in={reckeyExpand}>
            <Grid>
              <TextField />
              <Grid>
                <br />
              </Grid>
              <TextField />
              <Grid>
                <br />
              </Grid>
              <Button>hello</Button>
            </Grid>
          </Collapse>
        </Grid>
        <Grid>
          <Grid>
            <Typography sx={{ fontSize: 20 }} onClick={handleingExpand}>
              <p>Ingredients</p>
            </Typography>
          </Grid>
          <Collapse in={ingExpand}>
            <Grid>
              <TextField />
              <Grid>
                <br />
              </Grid>
              <TextField />
              <Grid>
                <br />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SearchSideBar;
