import { connect } from "react-redux"
import Menu from "../screens/Menu"
import { changeMenuType } from '../store/actions/menuActions'
const mapStateToProps = (state: any) => {
    return {
        styleView:state.menuReducers
    }
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        onChangeMenuType: (payload:any) => {
            dispatch(changeMenuType(payload))
        }
    }
}
const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu)
export default MenuContainer