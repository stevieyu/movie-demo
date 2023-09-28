import urql, { cacheExchange, fetchExchange } from '@urql/vue';

//https://formidable.com/open-source/urql/docs/basics/vue/
export default {
  install(app){
    app.use(urql, {
      url: 'https://yszy-dgjx.grafbase.app/graphql',
      fetchOptions: {
        headers: {
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTQ4ODE0MDAsImlzcyI6ImdyYWZiYXNlIiwiYXVkIjoiMDFIQUZDVkhXNDYyNEVKRUNZODNCTUUwNVciLCJqdGkiOiIwMUhBRkNWSFk5UEQzSDFaMDJUWVdWMzU5SCIsImVudiI6InByb2R1Y3Rpb24iLCJwdXJwb3NlIjoicHJvamVjdC1hcGkta2V5In0.DXgg-JbnRjV9oeLoK9VGKqoAl_C-rzfyzXVrdU63ezM'
        },
      },
      exchanges: [cacheExchange, fetchExchange]
    });
  }
}
