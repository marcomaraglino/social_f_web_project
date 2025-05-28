function PostComponent({description, imgSrc}) {
    return (
        <div className="post-component">
            <img src={imgSrc} alt={description} />
            <p>{description}</p>
        </div>
    )
}

export default PostComponent;