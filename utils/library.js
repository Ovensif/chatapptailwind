const showOppositeEmail = (props) => {

    let emailCurrentUser = props?.currentUser?.email
    let emailList = props?.owner?.owner

    return emailCurrentUser == emailList[0] ? emailList[1] : emailList[0];
}

export {showOppositeEmail}