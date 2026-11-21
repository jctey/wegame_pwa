const campusBgSrc = '/images/campus/bg.svg'

/** 第二层向上叠一点，盖住中间缝 */
const campusBgOverlap = '3svh'

/** 两层各 `(100% + overlap) / 2`，总高仍铺满 */
const campusBgLayerH = `calc((100% + ${campusBgOverlap}) / 2)`

/** 高校区块背景：同一张图上下各一层，接缝略重叠 */
export function CampusBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 flex h-full w-full rotate-180 flex-col overflow-hidden"
    >
      {Array.from({ length: 2 }, (_, index) => (
        <img
          key={index}
          src={campusBgSrc}
          alt=""
          className={`block w-full shrink-0 object-cover ${index === 1 ? 'origin-top  translate-x-[-38vw]' : ' translate-x-[-28vw]'}`}
          style={{
            height: index === 0 ? campusBgLayerH : undefined,
            marginTop: index > 0 ? `calc(-1 * ${campusBgOverlap})` : 0,
            transform: index === 0 ? `scale(3)` : undefined,
          }}
        />
      ))}
    </div>
  )
}