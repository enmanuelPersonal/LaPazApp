import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { TextInput, Dialog, Portal, Button } from "react-native-paper";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import DropDown from "react-native-paper-dropdown";

const initialStateNacimiento = {
  day: "",
  month: "",
  year: "",
};

const ItemsMeses = [
  { value: "1", label: "Enero" },
  { value: "2", label: "Febrero" },
  { value: "3", label: "Marzo" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Mayo" },
  { value: "6", label: "Junio" },
  { value: "7", label: "Julio" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

const ItemsDias = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "24", label: "24" },
  { value: "25", label: "25" },
  { value: "26", label: "26" },
  { value: "27", label: "27" },
  { value: "28", label: "28" },
  { value: "29", label: "29" },
  { value: "30", label: "30" },
  { value: "31", label: "31" },
];

const ItemsYear = [
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" },
  { value: "2014", label: "2014" },
  { value: "2013", label: "2013" },
  { value: "2012", label: "2012" },
  { value: "2011", label: "2011" },
  { value: "2010", label: "2010" },
  { value: "2009", label: "2009" },
  { value: "2008", label: "2008" },
  { value: "2007", label: "2007" },
  { value: "2006", label: "2006" },
  { value: "2005", label: "2005" },
  { value: "2004", label: "2004" },
  { value: "2003", label: "2003" },
  { value: "2002", label: "2002" },
  { value: "2001", label: "2001" },
  { value: "2000", label: "2000" },
  { value: "1999", label: "1999" },
  { value: "1998", label: "1998" },
  { value: "1997", label: "1997" },
  { value: "1996", label: "1996" },
  { value: "1995", label: "1995" },
  { value: "1994", label: "1994" },
  { value: "1993", label: "1993" },
  { value: "1992", label: "1992" },
  { value: "1991", label: "1991" },
  { value: "1990", label: "1990" },
  { value: "1989", label: "1989" },
  { value: "1988", label: "1988" },
  { value: "1987", label: "1987" },
  { value: "1986", label: "1986" },
  { value: "1985", label: "1985" },
  { value: "1984", label: "1984" },
  { value: "1983", label: "1983" },
  { value: "1982", label: "1982" },
  { value: "1981", label: "1981" },
  { value: "1980", label: "1980" },
  { value: "1979", label: "1979" },
  { value: "1978", label: "1978" },
  { value: "1977", label: "1977" },
  { value: "1976", label: "1976" },
  { value: "1975", label: "1975" },
  { value: "1974", label: "1974" },
  { value: "1973", label: "1973" },
  { value: "1972", label: "1972" },
  { value: "1971", label: "1971" },
  { value: "1970", label: "1970" },
  { value: "1969", label: "1969" },
  { value: "1968", label: "1968" },
  { value: "1967", label: "1967" },
  { value: "1966", label: "1966" },
  { value: "1965", label: "1965" },
  { value: "1964", label: "1964" },
  { value: "1963", label: "1963" },
  { value: "1962", label: "1962" },
  { value: "1961", label: "1961" },
  { value: "1960", label: "1960" },
];

export const FechaNacimiento = ({ setDialog, setFecha, getData, visible }) => {
  const [getFecha, setGetFecha] = useState(initialStateNacimiento);
  const [showDropDownDia, setShowDropDownDia] = useState(false);
  const [showDropDownMes, setShowDropDownMes] = useState(false);
  const [showDropDownAno, setShowDropDownAno] = useState(false);

  const { day, month, year } = getFecha;

  useEffect(() => {
    const { nacimiento } = getData;

    if (nacimiento) {
      const getDateNacimiento = new Date(nacimiento);
      const getDay = getDateNacimiento.getDate();
      const getMonth = getDateNacimiento.getMonth() + 1;
      const getYear = getDateNacimiento.getFullYear();

      setGetFecha({
        day: getDay.toString(),
        month: getMonth.toString(),
        year: getYear.toString(),
      });
    }
  }, []);

  const handleChange = (value, name) => {
    setGetFecha({ ...getFecha, [name]: value });
  };

  const handleSave = () => {
    setFecha({
      ...getData,
      nacimiento: month + "/" + day + "/" + year,
    });
    setDialog(false);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setDialog(false)}>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Fontisto
                name="date"
                size={30}
                color="#000"
                style={{ marginRight: 5 }}
                onPress={() => setDialog(false)}
              />
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginVertical: 5 }}
              >
                Fecha de nacimiento
              </Text>
              <Feather
                name="delete"
                size={30}
                color="#E51717"
                style={{ marginLeft: "24%" }}
                onPress={() => setDialog(false)}
              />
            </View>
            <View style={styles.rowStyle}>
              <View style={{ width: "30%" }}>
                <DropDown
                  label="Dia"
                  mode={"outlined"}
                  value={day}
                  setValue={(value) => handleChange(value, "day")}
                  list={ItemsDias}
                  visible={showDropDownDia}
                  showDropDown={() => setShowDropDownDia(true)}
                  onDismiss={() => setShowDropDownDia(false)}
                  inputProps={{
                    right: <TextInput.Icon name={"menu-down"} />,
                  }}
                />
              </View>
              <View style={{ width: "30%" }}>
                <DropDown
                  label="Mes"
                  mode={"outlined"}
                  value={month}
                  setValue={(value) => handleChange(value, "month")}
                  list={ItemsMeses}
                  visible={showDropDownMes}
                  showDropDown={() => setShowDropDownMes(true)}
                  onDismiss={() => setShowDropDownMes(false)}
                  inputProps={{
                    right: <TextInput.Icon name={"menu-down"} />,
                  }}
                />
              </View>
              <View style={{ width: "30%" }}>
                <DropDown
                  label="Año"
                  mode={"outlined"}
                  value={year}
                  setValue={(value) => handleChange(value, "year")}
                  list={ItemsYear}
                  visible={showDropDownAno}
                  showDropDown={() => setShowDropDownAno(true)}
                  onDismiss={() => setShowDropDownAno(false)}
                  inputProps={{
                    right: <TextInput.Icon name={"menu-down"} />,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button
            style={{ borderRadius: 12, marginRight: 15, marginVertical: 6 }}
            mode="contained"
            color="#000"
            onPress={handleSave}
          >
            Guardar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#FAFBFD",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2.5%",
    marginTop: 20,
    borderRadius: 10,
    flex: 1,
  },
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  container: {
    backgroundColor: "#DADCDF",
  },
});
