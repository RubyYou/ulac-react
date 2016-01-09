import Store from '../lib/Store';
//import find from 'lodash/collection/find';
import dispatcher from '../dispatcher';
import Actions from '../actions';

class AppStore extends Store {

    constructor() {
        super('AppStore');
        this.logger.debug('Initializing AppStore');
    }

    onAction(actionType) {
        this.logger.debug(`Received Action ${actionType} with data`, data);

        switch (actionType) {

            case 'NAVIGATE':
                
                break;

            default:
                this.logger.debug('default');
                break;
        }
    }

    // getNavigationRoute(route) {
    //     let newRoute = find(this.get('pages'), path => { return path.name === route.toLowerCase(); });
    //     if (!newRoute) {
    //         newRoute = find(this.get('pages'), path => { return path.default && path.default === true; });
    //     }
    //     return newRoute.name || '';
    // }
}

var appStore = new AppStore();
Dispatcher.registerStore(appStore);

export default AppStore;
