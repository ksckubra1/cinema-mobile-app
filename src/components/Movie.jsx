
export default function Movie({ movie }) {
    return (
        <div className="movie">
            <img src={movie.banner} alt="" />
        </div>
    )
}