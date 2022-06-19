<div className='pl-5 w-[88/100] my-1 mx-auto md:hidden'>
{/* 'build MobileTable for screens less than md:768px,' */}
<div>
  <div className='flex justify-between text-xs w-full m-[25px_10px_15px_0]'>
    {/* mobileAccordionHeading */}
    {colDefs.map(
      (def, ind) =>
        def.mobileHeader &&
        !def.HideInRespTab && <h4 key={ind}>{def.headerName}: </h4>
    )}
    <div className='invisible'>........</div>
    {/*  because "flex + justify between" should have atleast 2 html elements to get effective , */}
  </div>

  {dataStar.map((row, index) => (
    <details
      className='marker:none'
      key={index}
      expanded={expanded === index}
      onChange={handleChange(index)}
    >
      <summary
        aria-controls='panel1bh-content'
        id={`panel${index}`}
        className='list-outside marker:text-sky-400'
      >
        <span className='flex flex-row justify-between text-[10px]'>
          {/* eachMobileHeader */}
          {colDefs.map(
            (def, ix) =>
              def.mobileHeader && (
                <p
                  key={ix}
                  className={`w-full m-1 ${def.className} && ${def.className}`}
                >
                  {/* {row[def.field]} */}
                </p>
              )
          )}
        </span>
      </summary>
      <div className='flex flex-row w-full p-0 m-0 text-xs'>
        {/* eachMobileRow */}
        {colDefs.map(
          (def, ind) =>
            !def.mobileHeader && (
              <span
                key={ind}
                className='flex items-center justify-around w-full p-0'
              >
                <div
                  className={`border-b-2 border-solid border-[#fad3cf] ${def.className} && ${def.className}`}
                >
                  {def.headerName}: {row[def.field]}
                </div>
              </span>
            )
        )}
      </div>
    </details>
  ))}
</div>
</div>