import AsyncStorage from '@react-native-community/async-storage';
export const storeData = async (key:any,value:any) => {
    
	try {
	  await AsyncStorage.setItem(key,  JSON.stringify(value))
	} catch (e) {
	  // saving error
	}
  }
  export const getData = async (key:string) => {
	try {
	  const value = await AsyncStorage.getItem(key)
	  
	  if(value !== null) {
		return JSON.parse(value)
	  }
	} catch(e) {
	  // error reading value
	  return null;
	}
	return null;
  }
  export const _addInFavorite= async (data: any)=> {

	getData('favorites').then((favorite) => {
		let count = false
		if (favorite && favorite.length > 0) {
			for (let index = 0; index < favorite.length; index++) {
				const element = favorite[index];
				if (element.id == data.id) {
					count = true
				}
				if (count) {
					favorite.splice(index, 1)
					break
				}
			}
			if (count == false) {
				favorite.push(data)
			}
		} else {
			favorite.push(data)
		}

		storeData("favorites", favorite)
	})
}