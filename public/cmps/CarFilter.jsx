const { useState, useEffect } = React

export function CarFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onGetPage(dir) {
        setFilterByToEdit(prev => {
            if (prev.pageIdx + dir < 0) return prev
            return { ...prev, pageIdx: prev.pageIdx += dir }
        })
    }

    function togglePagination() {
        setFilterByToEdit(prev => {
            const paginationOn = !prev.paginationOn
            return { ...prev, paginationOn }
        })
    }

    const { txt, minSpeed } = filterByToEdit
    return (
        <section className="car-filter">
            <h2>Filter Our Cars</h2>
            <section className="pagination">

                <button disabled={!filterBy.paginationOn} onClick={() => onGetPage(-1)}>-</button>
                <span>{filterBy.pageIdx}</span>
                <button disabled={!filterBy.paginationOn} onClick={() => onGetPage(1)}>+</button>

                <button onClick={togglePagination}>Toggle Pagination</button>
            </section>

            <form>
                <label htmlFor="txt">Vendor: </label>
                <input value={txt} onChange={handleChange} type="text" placeholder="By Vendor" id="txt" name="txt" />

                <label htmlFor="minSpeed">Min Speed: </label>
                <input value={minSpeed} onChange={handleChange} type="number" placeholder="By Min Speed" id="minSpeed" name="minSpeed" />
            </form>
        </section>
    )
}