

export default function ReviewForm() {
    return (
    <>

    <form>
        <label htmlFor="reviewStars">
            Review Stars:
            <input type="number" id="reviewStars" name="reviewStars" min="1" max="5" />


        </label>
        <br />
        <label htmlFor="reviewText">
            Review Text:
            <textarea id="reviewText" name="reviewText"></textarea>
        </label>
    </form>
    </>
    )
}