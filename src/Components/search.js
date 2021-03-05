import React, { useState } from "react";
import axios from "axios";

const SearchPage = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const [result, setResult] = useState([]);
    const [loader, setLoader] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [photoInfo, setPhotoInfo] = useState({});

    const clientId = "l2n-iCATCW9bABDHVFsK9M_SRqpIUcQZ2r9QRQTtOnY";

    const onChangeInput = (event) => {
        setLoader(true);
        setSearchInput(event.target.value);
        getImages();
    }

    const getImages = () => {
        const uri = "https://api.unsplash.com/search/photos?page=1&query=" + searchInput + "&client_id=" + clientId;
        axios.get(uri).then((response) => {
            setResult(response.data.results);
            console.log("RESPONSE!!!!!!!!     ", response.data.results);
            setLoader(false);
        });
    };

    const onImgClick = (photo) => {
        console.log("EHEREHREHRHER");
        setModalOpen(true);
        setPhotoInfo(photo);
    };

    return (
        <div>
            {
                modalOpen ?
                    <div className="modal w3-animate-zoom">
                        <div className="close" onClick={() => setModalOpen(false)}>
                            x
                        </div>
                        <div className="modal-txt"><span>User : </span>{photoInfo.user.username}</div>
                        <div className="modal-txt">Likedby <span className="likespan">{photoInfo.likes}</span> users</div>
                        <div className="modal-txt"><span>Description : </span>{photoInfo.alt_description}</div>
                        <div className="modal-txt tags">
                            {
                                photoInfo.tags.map(tag => {
                                    return (
                                        <div className="modal-txt tag">#{tag.title}</div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    :
                    <div />
            }
            <div>
                <input
                    type="text"
                    placeholder="Search Images"
                    value={searchInput}
                    onChange={onChangeInput}
                    className="inpt"
                />
                {
                        !loader && searchInput.length !== 0 ?
                        <div className="images-bg">
                            {
                                result.map((photo) => {
                                    return (
                                        <div className="img-bg" onClick={() => onImgClick(photo)}>
                                            <div className="username">{photo.user.username}</div>
                                            <img src={photo.urls.small} className="img-sty" />
                                            <div className="image-footer">
                                                {
                                                    photo.liked_by_user ?
                                                        <button className="like-btn">liked</button>
                                                        :
                                                        <button className="like-btn">like</button>
                                                }
                                                <p className="likes">Liked by {photo.likes} users</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        <center>
                            {
                                searchInput.length !== 0 ?
                                    <h2>Loading....</h2>
                                :
                                    <div/>
                            }
                        </center>
                }
            </div>
        </div>
    );
};

export default SearchPage;