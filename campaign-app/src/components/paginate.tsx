import React from "react";

const Pagination = ({
  links,
  onPageChange,
  meta,
}: {
  links: any;
  onPageChange: any;
  meta: any;
}) => {
  return (
    <div className="flex gap-3 bg-slate-800 px-1 py-1 mt-10 rounded-md text-white">
      {/* First Page */}
      <button
        className="border border-transparent hover:border-slate-300 rounded-md px-3 py-1"
        onClick={() => onPageChange(links.first)}
        disabled={!links.first}
      >
        First
      </button>

      {/* Previous Page */}
      <button
        className="border border-transparent hover:border-slate-300 rounded-md px-3 py-1"
        onClick={() => onPageChange(links.prev)}
        disabled={!links.prev}
      >
        Previous
      </button>

      <span className="bg-slate-400 text-slate-900 px-3 py-1 rounded-sm">{`${meta.current_page} of ${meta.last_page}`}</span>

      {/* Next Page */}
      <button
        className="border border-transparent hover:border-slate-300 rounded-md px-3 py-1"
        onClick={() => onPageChange(links.next)}
        disabled={!links.next}
      >
        Next
      </button>

      {/* Last Page */}
      <button
        className="border border-transparent hover:border-slate-300 rounded-md px-3 py-1"
        onClick={() => onPageChange(links.last)}
        disabled={!links.last}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
