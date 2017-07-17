<template>
  <div class="hello">

    <b-field class="input-group">
      <b-input placeholder="Search Name..."
        v-model="search_name"
        icon="search">
      </b-input>
      <b-input placeholder="Search Location..."
        v-model="search_loc"
        icon="map">
      </b-input>
      <b-select v-model="pax">
        <option value="" hidden>Pax</option>
        <option value=""></option>
        <option value="0-10">&lt; 10</option>
        <option value="10-51">10 - 50</option>
        <option value="51-1000">&gt; 50</option>
      </b-select>
      <flat-pickr placeholder="Search Dates..."
        icon="map"
        v-model="dateRange"
        :config="{ mode: 'range', disable: [], wrap: true }">
      </flat-pickr> 
      <p class="control input-group-btn">
        <button class="button" data-clear>
          <b-icon icon="close"></b-icon>
        </button>
      </p>
    </b-field>

    <b-table
      :selected.sync="selected"
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
        No Matching Results
      </div>

    </b-table>

    <b-modal :active.sync="isCardModalActive" :width="640">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="../assets/placeholder-1280x960.png" alt="Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="../assets/placeholder-1280x960.png" alt="Image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ selected.name }}</p>
            </div>
          </div>
          <div class="content">
            {{ selected.description }}
          </div>
          <div class="content">
            <span
              v-for="booking in selected.bookings"
              class="tag is-success">
              {{ new Date(booking.date).toLocaleDateString() }}
            </span>
          </div>
          <div class="content">
            <small>Pickup: {{ selected.pickup }}</small>
            <br>
            <small>Dropoff: {{ selected.dropoff }}</small>
          </div>
          <div class="content is-clearfix">
            <div class="block is-pulled-left">
              <label class="button is-white">
                Packages:
              </label>
            </div>
            <div class="block is-pulled-right">
              <button
                class="button"
                v-for="package in selected.packages">
                {{ package.name }}
               </button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

  </div>
</template>

<script>
import data from '../data.json'
import _ from 'lodash'
import moment from 'moment'

export default {
  name: 'hello',
  data () {
    return {
      pax: '',
      search_name: '',
      search_loc: '',
      dateRange: null,
      selected: {},
      isCardModalActive: false
    }
  },
  watch: {
    selected (ship) {
      if (ship && ship.name) this.isCardModalActive = true
    },
    isCardModalActive (active) {
      if (!active) this.selected = {}
    }
  },
  computed: {
    tableData () {
      var ships = data
      ships = _.filter(ships, (ship) => {
        return _.includes(ship.name.toLowerCase(), this.search_name.toLowerCase())
      })
      if (this.pax) {
        var [start, end] = this.pax.split('-')
        console.log('start', start)
        console.log('end', end)
        ships = _.filter(ships, (ship) => {
          return _.inRange(ship.pax, start, end)
        })
      }
      ships = _.filter(ships, (ship) => {
        var dropoff = _.includes(ship.dropoff.toLowerCase(), this.search_loc.toLowerCase())
        var pickup = _.includes(ship.pickup.toLowerCase(), this.search_loc.toLowerCase())
        return dropoff || pickup
      })
      if (this.dateRange) {
        var [from, until] = this.dateRange.split(' to ')
        if (from && until) {
          ships = _.reject(ships, (ship) => {
            var dates = _.map(ship.bookings, 'date')
            console.log('dates', dates)
            var anyBetween = _.some(dates, (d) => {
              console.log('d', d)
              console.log('from', from)
              console.log('until', until)
              return moment(d).isBetween(from, until, null, '[]')
            })
            console.log('any between', anyBetween)
            return anyBetween
          })
        }
      }
      return ships
    }// ,
    // bookedDates () {
    //   var dates = _.uniq(_.map(_.flattenDeep(_.map(data, 'bookings')), 'date'))
    //   return dates
    // }
  }
}
</script>

<style scoped>
  .flatpickr-input {
    width: 210px;
  }
  td {
    cursor: pointer;
  }
</style>