interface IProgressProps {
    progress: number
}

const ProgressBar = ({ progress }: IProgressProps) => {

    return (
        <div className="rounded-md bg-zinc-500 w-full h-3 mt-4">
            <div
                role={"progressbar"}
                className="rounded-md bg-violet-700 h-3 transition-all"
                aria-label="Progresso dos hábitos completados neste dia"
                aria-valuenow={70}
                style={{ width: `${progress > 100 ? progress == 100 : progress}%` }}
            >
            </div>
        </div>
    )
};


export default ProgressBar;