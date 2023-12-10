import { Link } from "react-router-dom";
import DeleteButton from "./delete_button";

function Profile({firstName, lastName, email, phone, location, prefMission, profile, isSame, isSeeker}) {
    // in props is first name, last name, email, phone, location, pref/mission, profile
    
    function Edit({isSame, isSeeker}) {
        if (isSame) {
            if (isSeeker) {
                return <div className="mb-5">
                  <div className="text-end ">
                    <Link to="/profile/update/seeker" className="btn btn-outline-primary"
                    style={{"z-index": "1"}}>Edit Profile</Link>
                  </div>
                  <div className="text-end my-3">
                    <DeleteButton
                      isSeeker={isSeeker} />
                  </div>
                </div>;
            } else {
              return <div className="mb-5">
                <div className="text-end my-3">
                  <Link to="/profile/update/shelter" className="btn btn-outline-primary"
                  style={{"z-index": "1"}}>Edit Profile</Link>
                </div>
                <div className="text-center">
                  <DeleteButton
                    isSeeker={isSeeker} />
                </div>
              </div>;
            }
        }
    }

    return (
          <div className="row">
            <div className="col-lg-8">
              <div className="card mb-4 border-0 shadow">
                <div className="card-body text-center">
                  <div
                    className="rounded-top bg-color-baby-blue-3 d-flex flex-row"
                  >
                    <div
                      className="ms-4 mt-5 d-flex flex-column"
                      style={{"width": "150px"}}
                    //   style="width: 150px"
                    >
                      <img
                        src={"http://localhost:8000" + profile}
                        className="img-fluid img-thumbnail mt-4 mb-2"
                        style={{"width": "150px", "height": "150px", "z-index": "1"}}
                      />
                    </div>
                    <div className="ms-3" style={{"margin-top": "130px"}}></div>
                  </div>

                  <div className="p-4 text-black" style={{backgroundColor: "#f8f9fa"}}>
                    <div className="d-flex flex-row justify-content-end">
                      <Edit isSame={isSame} isSeeker={isSeeker}/>
                      {/* <a
                        href="seeker-account-update-page.html"
                        class="btn btn-outline-primary"
                        data-mdb-ripple-color="dark"
                        style="z-index: 1"
                      >
                        Edit profile
                      </a> */}
                    </div>
                    <div
                      className="d-flex flex-column mb-3 justify-content-end text-start py-1"
                    >
                      <h4 className="my-3">{firstName} {lastName}</h4>
                      <p className="text-muted mb-1">
                        {prefMission}
                      </p>
                      <p className="text-muted mb-4"></p>
                      <div className="d-flex mb-2">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Information  --> */}
            <div className="col-lg-4">
              <div className="card border-0 mb-4 shadow">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{phone}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Location</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}

export default Profile;