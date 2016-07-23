// polyfill webpack System.import
if(typeof System === "undefined") { var System = { import: function(path) { return Promise.resolve(require(path));}};}
import App from '../components/App';
import Map from '../containers/Map';

export default function createRoutes(store) {
  return {
    path: '/',
    component: App,
    indexRoute: {
      component: Map
    }
  };
}
