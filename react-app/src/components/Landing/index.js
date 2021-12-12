import React from 'react';
import style from "./landing.module.css";
import githubImageURL from "./assets/github.png"


export default function Landing() {
    return (
    <div className={style.landing}>
        <div className={style.landing_title_block}>
            <div className={style.landing_title}>Revel in the harmony...</div>
            <p className={style.landing_blurb}>...where we can come together in a succinct and familiar way.
            Host a server and invite members, your friends, team or family; create channels to stay orgainzed and enjoy direct messaging with other users.
            </p>
        </div>
        <div className={style.landing_details_block}>
            <p className={style.landing_details}>Thanks for taking time to visit Team Boa's group project.
            This full-stack app was created using Discord.com as a reference. Go ahead and try it out! You can...</p>
            <ul className={style.landing_detail_bullets}>
                <li>sign up</li>
                <li>login</li>
                <li>create a server</li>
                <li>create channels</li>
                <li>invite friends</li>
                <li>message channels</li>
            </ul>
            <ul></ul>
            <p className={style.landing_details}>...and if you are curious about what you see, check out the github repo here</p>
            <a href={'https://github.com/nummyrice/Harmony-discord-clone.git'}>
                <button className={style.github_repo}>Harmony-io on Github</button>
            </a>
        </div>
        <div className={style.landing_ref_block}>
            <a href={'https://github.com/will-short'} className={style.git_link}>
                <div>Will</div>
                <img alt={'github logo'}src={githubImageURL}></img>
            </a>
            <a href={'https://github.com/codenamerick'} className={style.git_link}>
                <div>Rick</div>
                <img alt={'github logo'}src={githubImageURL}></img>
            </a>
            <a href={'https://github.com/robstrass'}className={style.git_link}>
                <div>Rob</div>
                <img alt={'github logo'}src={githubImageURL}></img>
            </a>
            <a href={'https://github.com/nummyrice'}className={style.git_link}>
                <div>Nick</div>
                <img alt={'github logo'}src={githubImageURL}></img>
            </a>
        </div>
    </div>
    )
}
