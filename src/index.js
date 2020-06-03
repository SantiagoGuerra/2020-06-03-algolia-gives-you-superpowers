import './styles/main.scss';
import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import { searchBox, hits, stats, refinementList, pagination } from 'instantsearch.js/es/widgets';

function hitTemplate(hit) {

  console.log(hit)
  return `
      <li class="collection-item avatar">
        <div class="basic-description">
        <img src="${hit.flag}" alt="" class="circle">
        <span class="title">Country: ${hit.name}</span>
        <p>Country:<br>
          ${hit.name}
        </p>
        </div>
        
      </li>
    `;
}

const searchClient = algoliasearch('CSPE2NLVZ6', '44d1dd78f1c5ed613b63a1cf9c69b8da');

const search = instantsearch({
  indexName: 'weather',
  searchParameters: {
    hitsPerPage: 3,
    attributesToSnippet: ['content:14'],
    snippetEllipsisText: ' [...]',
  },
  searchClient,
});



// search
search.addWidgets([
  searchBox({
    container: "#searchbox",
    placeholder: "Search articles",
    autofocus: false,
    showReset: false,
    showSubmit: false,
  }),

  stats({
    container: "#stats",
    templates: {
      body(hit) {
        return `<span role="img" aria-label="emoji">⚡️</span> <strong>${hit.nbHits}</strong> results found ${
          hit.query != "" ? `for <strong>"${hit.query}"</strong>` : ``
        } in <strong>${hit.processingTimeMS}ms</strong>`;
      }
    }
  }),
  
  hits({
    container: "#hits",
    templates: {
      empty: "No results found.",
      item(hit) {
        return `<ul class="class="collection">${hitTemplate(hit)}</ul>`
      }
    }
  }),

  pagination({
    container: "#pagination",
    cssClasses: {
      list: 'pagination',
      item: 'waves-effect',
      selectedItem: 'active'
    }
  })
]);

search.start();

// index.setSettings({
//   // Select the attributes you want to search in
//   searchableAttributes: [
//     'post_title', 'author_name', 'categories', 'content'
//   ],
//   // Define business metrics for ranking and sorting
//   customRanking: [
//     'desc(post_date)', 'desc(record_index)'
//   ],
//   // Set up some attributes to filter results on
//   attributesForFaceting: [
//     'categories'
//   ],
//   // Define the attribute we want to distinct on
//   attributeForDistinct: 'post_id'
// });

// fetch('https://alg.li/doc-media.json')
//   .then(function(response) {
//     return response.json()
//   })
//   .then(function(posts) {
//     return index.saveObjects(posts, {
//       autoGenerateObjectIDIfNotExist: true
//     })
//   })