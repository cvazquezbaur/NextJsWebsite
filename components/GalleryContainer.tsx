export default function Gallery() {
    return(
        <section className="mx-auto my-8 w-full shadow-2xs shadow-slate-600/50 max-w-xl sm:max-w-4xl md:max-w-5xl p-6 sm:p-10 text-white shadow-xl bg-linear-to-b from-slate-800/70 via-slate-700/60 to-slate-600/50 rounded-2xl">
            <h2 className="text-2xl text-center sm:text-3xl font-semibold mb-2">Gallery</h2>
            <p className="text-center text-white/90 mb-4">A small collection of my performances and musical moments.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6"></div>
        </section>
    );
}