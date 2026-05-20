import { Bike, Clock, Gauge, MapPin, Route, TriangleAlert } from "lucide-react";
import { useState } from "react";
import type { CourseContent, Locale } from "../content/types";
import { withBasePath } from "../utils/paths";

interface Props {
  courses: CourseContent[];
  locale: Locale;
}

export default function CourseTabs({ courses, locale }: Props) {
  if (courses.length === 0) {
    return null;
  }

  const copy = {
    ko: {
      tabAria: "코스 선택",
      summarySuffix: "요약",
      highlightsTitle: "주요 지점",
      cautionsTitle: "운영 주의"
    },
    en: {
      tabAria: "Course selection",
      summarySuffix: "summary",
      highlightsTitle: "Highlights",
      cautionsTitle: "Operation notes"
    }
  }[locale];
  const firstCourse = courses[0];
  const [activeId, setActiveId] = useState(firstCourse.id);
  const activeCourse = courses.find((course) => course.id === activeId) ?? firstCourse;
  const stats = [
    { label: "Distance", value: activeCourse.distance, icon: Route },
    { label: "Duration", value: activeCourse.duration, icon: Clock },
    { label: "Ride", value: activeCourse.rideTime, icon: Bike },
    { label: "Level", value: activeCourse.difficulty, icon: Gauge }
  ];

  return (
    <div className="course-tabs">
      <div className="tab-list" role="tablist" aria-label={copy.tabAria}>
        {courses.map((course) => (
          <button
            key={course.id}
            id={`course-tab-${course.id}`}
            type="button"
            role="tab"
            aria-selected={course.id === activeId}
            aria-controls={`course-panel-${course.id}`}
            className={course.id === activeId ? "is-active" : ""}
            onClick={() => setActiveId(course.id)}
          >
            <MapPin aria-hidden="true" size={16} />
            <span>{course.name}</span>
          </button>
        ))}
      </div>

      <section
        id={`course-panel-${activeCourse.id}`}
        role="tabpanel"
        aria-labelledby={`course-tab-${activeCourse.id}`}
        className="course-panel"
      >
        <div className="course-panel-layout">
          <figure className="course-map">
            <img src={withBasePath(activeCourse.mapImage.src)} alt={activeCourse.mapImage.alt} loading="lazy" decoding="async" />
            {activeCourse.mapImage.caption ? <figcaption>{activeCourse.mapImage.caption}</figcaption> : null}
          </figure>

          <div>
            <div className="course-stats" aria-label={`${activeCourse.name} ${copy.summarySuffix}`}>
              {stats.map(({ label, value, icon: Icon }) => (
                <span key={label}>
                  <Icon aria-hidden="true" size={18} />
                  {value}
                </span>
              ))}
            </div>

            <div className="course-summary-grid">
              <div>
                <h3>{copy.highlightsTitle}</h3>
                <ul className="course-highlights">
                  {activeCourse.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{copy.cautionsTitle}</h3>
                <ul className="course-cautions">
                  {activeCourse.cautions.map((caution) => (
                    <li key={caution}>
                      <TriangleAlert aria-hidden="true" size={16} />
                      <span>{caution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="course-gallery" aria-label={`${activeCourse.name} media`}>
          {activeCourse.gallery.map((asset) => (
            <figure key={`${activeCourse.id}-${asset.src}`}>
              <img src={withBasePath(asset.src)} alt={asset.alt} loading="lazy" decoding="async" />
              {asset.caption ? <figcaption>{asset.caption}</figcaption> : null}
            </figure>
          ))}
        </div>

        <ol className="course-timeline">
          {activeCourse.points.map((point) => (
            <li key={`${activeCourse.id}-${point.marker}-${point.title}`}>
              <span className="hangul-marker">{point.marker}</span>
              <div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
                <small>{point.safetyNote}</small>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
