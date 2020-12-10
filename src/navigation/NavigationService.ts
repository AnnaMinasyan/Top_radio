import { NavigationActions, NavigationParams, StackActions } from 'react-navigation';



class NavigationService {
	private _navigator: any = null;

	navigate(routeName: string, params?: { [key: string]: any }) {
		console.log("routeName",routeName)
		// firebase.analytics().logEvent('navigation', {screen: routeName});
		// Analytics.trackEvent('navigation', {screen: routeName});
		if(this._navigator){
			this._navigator.navigate(routeName)
			console.log(this._navigator)
			// this._navigator.dispatch(
			// 	NavigationActions.navigate({
			// 		routeName,
			// 		params
			// 	})
			// );
		}else{
			setTimeout(() => {
				this.navigate(routeName,params)
			}, 200);
		}
		
	}

	goBack() {
		this._navigator.dispatch(NavigationActions.back());
	}

	setNavigator(value: any) {

		this._navigator = value;
	}

	resetStack(indexToReset: number, route: StackEnums, params?: NavigationParams) {
		
		const resetAction = StackActions.reset({
			index: indexToReset,
			actions: [
				NavigationActions.navigate({
					routeName: route,
					params: params,
				})
			]
		});
		this._navigator.dispatch(resetAction);
	}
}

const navigationService = new NavigationService();
export default navigationService;
