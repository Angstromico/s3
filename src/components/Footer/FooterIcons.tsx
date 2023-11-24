import React from 'react'
import style from './style.module.scss'
import { type IconsInfo } from './Types'

interface ArrIcons {
  arr: IconsInfo[]
}

const FooterIcons = ({ arr }: ArrIcons) => {
  return (
    <React.Fragment>
      {arr.map((content, index: number) => (
        <div className={style.ico} key={index}>
          {!content.link && <img src={content.url} alt={content.altText} />}
          {content.link && (
            <a href={content.link} target='_blank'>
              <img src={content.url} alt={content.altText} />
            </a>
          )}
          <p>{content.title}</p>
        </div>
      ))}
    </React.Fragment>
  )
}

export default FooterIcons
