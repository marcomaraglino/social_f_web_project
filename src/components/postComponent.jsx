function PostComponent({description, imgSrc}) {
    return (
        <div>
            <img src={imgSrc} alt={description} />
            <p>{description}</p>
        </div>
    )
}

export default PostComponent;