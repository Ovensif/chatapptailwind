const showOppositeEmail = (props) => {

    let emailCurrentUser = props?.currentUser
    let emailList = props?.owner?.owner
    
    return emailList.indexOf(emailCurrentUser) == 0 ? emailList[0] : emailList[1];
}

export {showOppositeEmail}