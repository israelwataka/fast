import { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import projects from '@data/Portfolio/videos.json';
import 'react-image-lightbox/style.css'; // Import lightbox styles if needed
import Lightbox from 'react-image-lightbox'; // Import lightbox component

const Projects = ({ style = "4" }) => {
  const [photoIndex, setPhotoIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.mixitup) {
      setTimeout(() => {
        window.mixitup('.portfolio-projects');
      }, 0);
    }
  }, []);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const openVideo = (url) => {
    setVideoUrl(url);
    setIsVideoOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setPhotoIndex(-1);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    setVideoUrl(null);
  };

  return (
    <section className={`portfolio-projects section-padding pt-50 style-1 ${style === '5' ? '' : 'bg-white'}`}>
      <div className="container">
        <div className={`section-head text-center style-${style} ${style === '5' ? 'mb-60' : 'mb-40'}`}>
          {style === '5' && (<small className="title_small">portfolio</small>)}
          <h2 className="mb-20">
            Portfolio
          </h2>
          <p>
            From Ordinary to Extraordinary - Watch Our Magic in Motion.
            <br />
            See the Difference Quality Service Makes - Check Out Our Latest Projects.
          </p>
        </div>
        <div className="controls">
          {projects.filters.map((filter, i) => (
            <button key={i} type="button" className="control" data-filter={filter.filter}>{filter.title}</button>
          ))}
        </div>
        <section className="portfolio style-1">
          <div className="content">
            <div className="row mix-container">
              {projects.projects.map((project, i) => (
                <div className={`col-lg-4 mix ${project.filter}`} key={i}>
                  <div className={`portfolio-card ${i !== projects.projects.length - 1 ? 'mb-50' : ''}`}>
                    <div className="img">
                      {project.video ? (
                        <div
                          className="video-cover"
                          onClick={() => openVideo(project.video)}
                        >
                          <img
                            src={project.cover}
                            alt={project.title}
                            style={{ cursor: 'pointer' }}
                          />
                          <div className="play-icon">
                            <i className="bi bi-play-circle"></i>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          onClick={() => openLightbox(i)}
                          style={{ cursor: 'pointer' }}
                        />
                      )}
                    </div>
                    <div className="info">
                      <h5>{project.title}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <Link href="/contact" passHref>
              <a className={`btn rounded-pill fw-bold ${style === '5' ? 'mt-30 sm-butn hover-blue2 blue5-3Dbutn' : 'me-4 text-white bg-blue4'}`}>
                <small>You are on the right track</small>
              </a>
            </Link>
          </div>
        </section>
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={projects.projects[photoIndex].image}
          nextSrc={projects.projects[(photoIndex + 1) % projects.projects.length].image}
          prevSrc={projects.projects[(photoIndex + projects.projects.length - 1) % projects.projects.length].image}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + projects.projects.length - 1) % projects.projects.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % projects.projects.length)
          }
        />
      )}
      {isVideoOpen && (
        <div className="video-lightbox" onClick={closeVideo}>
          <div className="video-content">
            <ReactPlayer
              url={videoUrl}
              playing
              controls
              width="100%"
              height="100%"
            />
          </div>
        </div>
      )}
      <style>{`
        .video-cover {
          position: relative;
          cursor: pointer;
          display: inline-block;
        }

        .video-cover img {
          width: 100%;
          height: auto;
          display: block;
        }

        .play-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3rem;
          color: #fff;
          pointer-events: none;
        }

        .video-lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .video-content {
          position: relative;
          width: 80%;
          height: 80%;
        }

        .video-content .react-player {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </section>
  );
}

export default Projects;
