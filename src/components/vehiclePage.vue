<template>
  <h1>TRAVEL AGENCY VEHICLES</h1>

  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"  style="margin-right: 10px;">
          Add Vehicle
        </v-btn>
        <div style="height: 50px;"></div>
        <v-btn color="primary" v-bind="props" @click="logout">
          LOGOUT
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Vehicle Information</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name*" required v-model="newVehicle.name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete :items="['Bus', 'Car', 'Bike', 'Truck']" label="Type"
                  v-model="newVehicle.type"></v-autocomplete>
              </v-col>



              <v-col cols="12" sm="6">
                <v-autocomplete :items="['2', '4', '8', '50', '50+']" label="Seating Count"
                  v-model="newVehicle.seatingcount"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Hourly Rate" v-model="newVehicle.hourlyrate" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete :items="['Diesel', 'Petrol', 'CNG', 'Electric']" label="Fuel Type"
                  v-model="newVehicle.fueltype"></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="saveNewVehicle">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>


  <!--Vehicle Table-->
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            id
          </th>

          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Type
          </th>
          <th class="text-left">
            Seating Count
          </th>
          <th class="text-left">
            Fuel Type
          </th>
          <th class="text-left">
            Hourly Rate
          </th>
          <th class="text-left">
            Actions
          </th>

        </tr>
      </thead>
      <tbody id="vehicle-table">
       
        <tr v-for="(vehicle) in vehicles" :key="vehicle.name">

          <td>{{ vehicle.name }}</td>
          <td>{{ vehicle.type }}</td>
          <td>{{ vehicle.seatingcount }}</td>
          <td>{{ vehicle.fueltype }}</td>
          <td>{{ vehicle.hourlyrate }}</td>
          <td><v-btn @click="editVehicleInfo(vehicle.id)"> Edit</v-btn></td>
          <td> <v-btn @click="deleteVehicleInfo(vehicle.id)"> Delete</v-btn></td>

        </tr>
      </tbody>
    </v-table>



    <v-row justify="center">
      <v-dialog v-model="editDialog" persistent width="1024">
        <template v-slot:activator="{}">

        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Editing Vehicle Information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Name*" required v-model="editedVehicle.name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete :items="['Bus', 'Car', 'Bike', 'Truck']" label="Type"
                    v-model="editedVehicle.type"></v-autocomplete>
                </v-col>



                <v-col cols="12" sm="6">
                  <v-autocomplete :items="['2', '4', '8', '50', '50+']" label="Seating Count"
                    v-model="editedVehicle.seatingcount"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Hourly Rate" v-model="editedVehicle.hourlyrate" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete :items="['Diesel', 'Petrol', 'CNG', 'Electric']" label="Fuel Type"
                    v-model="editedVehicle.fueltype"></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="editDialog = false">
              Close
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveEditedVehicle()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>




  </v-container>
</template>


<script>
import axios from 'axios'


export default {
  data() {
    return {

      dialog: false,
      editDialog: false,
      editedIndex: -1,
      vehicleid: -1,
      

      vehicles: [

      ],
      newVehicle: {
        name: null,
        type: null,
        seatingcount: null,
        fueltype: null,
        hourlyrate: null,
      },
      editedVehicle: {
        name: null,
        type: null,
        seatingcount: null,
        fueltype: null,
        hourlyrate: null,

      }

    };
  },
  created() {
    this.getvehicles();
  },
  methods: {
    saveNewVehicle() {
      let token = window.localStorage.getItem("vehicleToken");
      console.log("vehicleToken", token)
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      };
      console.log("saving new vehicle", this.newVehicle);
      axios.post("http://192.168.0.128:8000/api/vehicles", this.newVehicle, config)
        .then(() => {
          this.vehicles.push({
            name: this.newVehicle.name,
            type: this.newVehicle.type.toString(),
            fueltype: this.newVehicle.fueltype.toString(),
            seatingcount: this.newVehicle.seatingcount.toString(),
            hourlyrate: this.newVehicle.hourlyrate,
          });

          this.dialog = false;
          this.newVehicle = {
            name: null,
            type: null,
            seatingcount: null,
            fueltype: null,
            hourlyrate: null,
          };
        }
        )
        .catch(error => {
          console.error(error)
          this.loading = false
        })
    },


    deleteVehicleInfo(id) {
      console.log(id);
      let token = window.localStorage.getItem("vehicleToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(id);
      axios.delete(`http://192.168.0.128:8000/api/vehicles/${id}`, config)
        .then(() => {
          this.vehicles.splice(id, 1);
          this.getvehicles()
        })
        .catch(error => {
          console.error(error)
        })
    },
    editVehicleInfo(index) {

      let token = window.localStorage.getItem("vehicleToken");

      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      };

      axios.get(`http://192.168.0.128:8000/api/vehicles/${index}`, config)
        .then((response) => {
          this.editedIndex = index;
          this.editedVehicle = JSON.parse(JSON.stringify(response.data));
          this.editDialog = true;

        })
        .catch(error => {
          console.log(error);
        })
    },
    saveEditedVehicle() {
      console.log("saving edited vehicle", this.editedVehicle);
      let token = window.localStorage.getItem("vehicleToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      axios.put(`http://192.168.0.128:8000/api/vehicles/${this.editedIndex}`, JSON.stringify(this.editedVehicle), config)
        .then((response) => {
          this.vehicles[this.editedIndex] = JSON.parse(JSON.stringify(response.data));



        })
        .catch(error => {
          console.log(error);
        })

      this.editDialog = false;
      this.getvehicles()


      //alert(this.editDialog);


    },
    getvehicles() {
      let token = window.localStorage.getItem("vehicleToken");
      console.log("vehicleToken", token)
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      };
      axios.get('http://192.168.0.128:8000/api/vehicles', config)

        .then((response) => {
          this.vehicles = response.data;
          console.log(response.data);

        })
        .catch((error) => {
          console.error(error);
        });
    },
    logout() {
      let token = window.localStorage.getItem("vehicleToken");
      console.log(token);
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      };
      axios.post("http://192.168.0.128:8000/api/logout", token,config)


        .then((response) => {

          console.log(response);
          window.localStorage.clear();
          if (response.status == 200) {
            this.$router.push("/login");
          }


        })
        .catch(function (error) {

          console.log("axios error: ", error.response.data);

        });
    }






  }
};


</script>

  