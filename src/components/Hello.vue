<template>
  <div class="hello">

    <b-field label="Name">
      <b-input value="John Silver"></b-input>
    </b-field>

    <b-table
      :data="tableData">

      <template scope="props">

          <b-table-column field="name" label="Name" sortable>
              {{ props.row.name }}
          </b-table-column>

          <b-table-column field="description" label="Description">
              {{ props.row.description | truncate(50) }}
          </b-table-column>

          <b-table-column field="pax" label="Passengers" sortable>
              {{ props.row.pax }}
          </b-table-column>

          <b-table-column field="pickup" label="Pickup Location" sortable>
              {{ props.row.pickup }}
          </b-table-column>

          <b-table-column field="dropoff" label="Dropoff Location" sortable>
              {{ props.row.dropoff }}
          </b-table-column>

          <b-table-column field="bookings" label="Bookings" sortable>
            <span v-for="booking in props.row.bookings" class="tag is-success">
                {{ new Date(booking.date).toLocaleDateString() }}
            </span>
          </b-table-column>

      </template>

      <div slot="empty" class="has-text-centered">
          This table is empty!
      </div>

    </b-table>
  </div>
</template>

<script>
import data from '../data.json'

export default {
  name: 'hello',
  computed: {
    tableData () {
      var ships = data
      return ships
    }
  }
}
</script>