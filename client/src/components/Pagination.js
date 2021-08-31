import React from 'react';
import {Link} from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

function Pagination({count,perPage,page,path}) {
    let totalPages = Math.ceil(count / perPage);
	let startLoop = page;
	let diff = totalPages - page;
    if (diff <= 3) {
		startLoop = totalPages - 3;
	}
	let endLoop = startLoop + 3;
	if (startLoop <= 0) {
		startLoop = 1;
	}
    const links = () => {
		const store = [];

		for (let i = startLoop; i <= endLoop; i++) {
			store.push(
				<li key={i} className={i == page ? 'activa' : ''}>
					<Link to={`/${path}/${i}`}>{i}</Link>
				</li>
			);
		}
		return store;
	};
    const next = () => {
		if (page < totalPages) {
			return (
				<li>
					<Link className="set" to={`/${path}/${parseInt(page) + 1}`}>
						<ChevronRightIcon className="arrow" />
					</Link>
				</li>
			);
		}
	};
	const prev = () => {
		if (page > 1) {
			return (
				<li>
					<Link className="set" to={`/${path}/${parseInt(page - 1)}`}>
						<ChevronLeftIcon className="arrow"/>
					</Link>
				</li>
			);
		}
	};
    return totalPages && count>3 ?(
		<div className="pagination">
		{prev()}
		{links()}
		{next()}
	   
	</div>
	) : ("");
}

export default Pagination
