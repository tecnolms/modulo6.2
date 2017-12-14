# VCB Courses

Platform to mount courses with all the power of Vue.

## Course folder

All the content of the course go to the `src/course` folder.

#### course.json

This is the main file to create the course. The attributes on it are mandatory. Let's explain every one.

**id**: _string_. Course ID.

**type**: _string_. The type of the course. Options available: `module` or `other`.

**title**: _string_. Course title.

**qtySlides**: _number_. Number of the total slides for the course.

## translations.json

This is the file for the translations for the framework.

## content.json

File for the course content. The mandatory attributes are:

**id**: _string_. Component ID.

**parentId**: _string_. Parent Course ID.

**type**: _string_. The type of the component.

**title**: _string_. Component Title.
