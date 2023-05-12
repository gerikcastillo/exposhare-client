import "./UserDashboard.scss";




function UserDashboard({setEditForm}) {
    return (
      <div className="user-dashboard__wrapper-1">
        <h1 className="user-dashboard__title">
          My Dashboard{" "}
          <button className="user-dashboard__button-edit" onClick={() => setEditForm(true)}>
            Edit Profile
          </button>
        </h1>
      </div>
    );
  }


  export default UserDashboard;