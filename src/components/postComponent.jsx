import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function PostComponent({description, imgSrc, profileName = "Default", lastSeen}) {
    return (
        <div className="post-component">
            <div className="header">
                <p className="profile-name">{profileName}</p>
                <p className="last-seen">{lastSeen}</p>
            </div>
            <img src={imgSrc} alt={description} />
            <div className="description">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default PostComponent;