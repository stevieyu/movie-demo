<template>
  <router-view />
</template>

<script setup>
import { provide } from 'vue'
// https://apollo.vuejs.org/zh-cn/
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: 'https://yszy-dgjx.grafbase.app/graphql',
    headers:{
      'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTQ4ODE0MDAsImlzcyI6ImdyYWZiYXNlIiwiYXVkIjoiMDFIQUZDVkhXNDYyNEVKRUNZODNCTUUwNVciLCJqdGkiOiIwMUhBRkNWSFk5UEQzSDFaMDJUWVdWMzU5SCIsImVudiI6InByb2R1Y3Rpb24iLCJwdXJwb3NlIjoicHJvamVjdC1hcGkta2V5In0.DXgg-JbnRjV9oeLoK9VGKqoAl_C-rzfyzXVrdU63ezM'
    }
  }),
  cache: new InMemoryCache(),
})

provide(DefaultApolloClient, apolloClient)
</script>
