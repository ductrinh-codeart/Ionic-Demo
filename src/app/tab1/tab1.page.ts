import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  ComponentList: Array<object> = []
  names: Array<string> = [];
  
  constructor() {

    this.ComponentList = [
      {
        name: 'action sheet',
        link: '/actionsheet',
        description: "An Action Sheet is a dialog that displays a set of options. It appears on top of the app's content, and must be manually dismissed by the user before they can resume interaction with the app. Destructive options are made obvious in ios mode. There are multiple ways to dismiss the action sheet, including tapping the backdrop or hitting the escape key on desktop.",
      },
      {
        name: 'alert',
        link: '/alert',
        description: "An Alert is a dialog that presents users with information or collects information from the user using inputs. An alert appears on top of the app's content, and must be manually dismissed by the user before they can resume interaction with the app. It can also optionally have a header, subHeader and message."
      },
      {
        name: 'avatar',
        link: '/avatar',
        description: "Avatars are circular components that usually wrap an image or icon. They can be used to represent a person or an object.",
      },
      {
        name: 'badge',
        link: '/badge',
        description: "Badges are inline block elements that usually appear near another element. Typically they contain a number or other characters. They can be used as a notification that there are additional items associated with an element and indicate how many items there are.",
      },
      {
        name: 'button',
        link: '/button',
        description: "Buttons provide a clickable element, which can be used in forms, or anywhere that needs simple, standard button functionality. They may display text, icons, or both. Buttons can be styled with several attributes to look a specific way.",
      },
      {
        name: 'card',
        link: '/card',
        description: "Cards are a standard piece of UI that serves as an entry point to more detailed information. A card can be a single component, but is often made up of some header, title, subtitle, and content. ion-card is broken up into several sub-components to reflect this. Please see ion-card-content, ion-card-header, ion-card-title, ion-card-subtitle.",
      },
      {
        name: 'checkbox',
        link: '/checkbox',
        description: "Checkboxes allow the selection of multiple options from a set of options. They appear as checked (ticked) when activated. Clicking on a checkbox will toggle the checked property. They can also be checked programmatically by setting the checked property.",
      },
      {
        name: 'chip',
        link: '/chip',
        description: "Chips represent complex entities in small blocks, such as a contact. A chip can contain several different elements such as avatars, text, and icons.",
      },
      {
        name: 'content',
        link: '/content',
        description: "The content component provides an easy to use content area with some useful methods to control the scrollable area. There should only be one content in a single view.",
      },
      {
        name: 'date & time picker',
        link: '/datetimepicker',
        description: "Datetimes present a picker interface from the bottom of a page, making it easy for users to select dates and times. The picker displays scrollable columns that can be used to individually select years, months, days, hours and minute values. Datetimes are similar to the native input elements of type datetime-local, however, Ionic's Datetime component makes it easy to display the date and time in a preferred format, and manage the datetime values.",
      },
      {
        name: 'floating action button',
        link: '/floating-action-button',
        description: "Fabs are container elements that contain one or more fab buttons. They should be placed in a fixed position that does not scroll with the content. Fab should have one main fab-button. Fabs can also contain fab-lists which contain related buttons that show when the main fab button is clicked. The same fab container can contain several fab-list elements with different side values.",
      },
      {
        name: 'grid',
        link: '/grid',
        description: "The grid is a powerful mobile-first flexbox system for building custom layouts.  It is composed of three units — a grid, row(s) and column(s). Columns will expand to fill the row, and will resize to fit additional columns. It is based on a 12 column layout with different breakpoints based on the screen size. The number of columns can be customized using CSS.",
      },
      {
        name: 'icon',
        link: '/icon',
        description: "Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed and built by Ionic.",
      },
      {
        name: 'infinitescroll',
        link: '/infinitescroll',
        description: "The Infinite Scroll component calls an action to be performed when the user scrolls a specified distance from the bottom or top of the page.",
      },
      {
        name: 'input',
        link: '/input',
        description: "The input component is a wrapper to the HTML input element with custom styling and additional functionality. It accepts most of the same properties as the HTML input, but works great on desktop devices and integrates with the keyboard on mobile devices.",
      },
      {
        name: 'item',
        link: '/item',
        description: "Items are elements that can contain text, icons, avatars, images, inputs, and any other native or custom elements. Generally they are placed in a list with other items. Items can be swiped, deleted, reordered, edited, and more.",
      },
      {
        name: 'itemgroup',
        link: '/itemgroup',
        description: "Item groups are containers that organize similar items together. They can contain item dividers to divide the items into multiple sections. They can also be used to group sliding items.",
      },
      {
        name: 'list',
        link: '/list',
        description: "Lists are made up of multiple rows of items which can contain text, buttons, toggles, icons, thumbnails, and much more. Lists generally contain items with similar data content, such as images and text.",
      },
      {
        name: 'loading',
        link: '/loading',
        description: "An overlay that can be used to indicate activity while blocking user interaction. The loading indicator appears on top of the app's content, and can be dismissed by the app to resume user interaction with the app. It includes an optional backdrop, which can be disabled by setting showBackdrop: false upon creation.",
      },
      {
        name: 'menu',
        link: '/menu',
        description: "The Menu component is a navigation drawer that slides in from the side of the current view. By default, it slides in from the left, but the side can be overridden. The menu will be displayed differently based on the mode, however the display type can be changed to any of the available menu types. The menu element should be a sibling to the root content element. There can be any number of menus attached to the content. These can be controlled from the templates, or programmatically using the MenuController.",
      },
      {
        name: 'modal',
        link: '/modal',
        description: "A Modal is a dialog that appears on top of the app's content, and must be dismissed by the app before interaction can resume. It is useful as a select component when there are a lot of options to choose from, or when filtering items in a list, as well as many other use cases.",
      },
      {
        name: 'navigation',
        link: '/navigation',
        description: "Nav is a standalone component for loading arbitrary components and pushing new components on to the stack.",
      },
      {
        name: 'note',
        link: '/note',
        description: "Notes are text elements generally used as subtitles that provide more information. Notes are styled to appear grey by default. Notes can be used in an item as metadata text.",
      },
      {
        name: 'picker',
        link: '/picker',
        description: "A Picker is a dialog that displays a row of buttons and columns underneath. It appears on top of the app's content, and at the bottom of the viewport.",
      },
      {
        name: 'popover',
        link: '/popover',
        description: "A Popover is a dialog that appears on top of the current page. It can be used for anything, but generally it is used for overflow actions that don't fit in the navigation bar.",
      },
      {
        name: 'progress',
        link: '/progress',
        description: "Progress bars inform users about the status of ongoing processes, such as loading an app, submitting a form, or saving updates. There are two types of progress bars: determinate and indeterminate.",
      },
      {
        name: 'radio',
        link: '/radio',
        description: "Radios should be used inside of an ion-radio-group. Pressing on a radio will check it. They can also be checked programmatically by setting the value property of the parent ion-radio-group to the value of the radio.  When radios are inside of a radio group, only one radio in the group will be checked at any time. Pressing a radio will check it and uncheck the previously selected radio, if there is one. If a radio is not in a group with another radio, then both radios will have the ability to be checked at the same time.",
      },
      {
        name: 'range',
        link: '/range',
        description: "The Range slider lets users select from a range of values by moving the slider knob. It can accept dual knobs, but by default one knob controls the value of the range.",
      },
      {
        name: 'refresher',
        link: '/refresher',
        description: "The refresher provides pull-to-refresh functionality on a content component. The pull-to-refresh pattern lets a user pull down on a list of data using touch in order to retrieve more data.",
      },
      {
        name: 'reorder',
        link: '/reorder',
        description: "Reorder is a component that allows an item in a group of items to be dragged to change its order within that group. It must be used within an ion-reorder-group to provide a visual drag and drop interface.",
      },
      {
        name: 'searchbar',
        link: '/searchbar',
        description: "Searchbars represent a text field that can be used to search through a collection. They can be displayed inside of a toolbar or the main content.",
      },
      {
        name: 'segment',
        link: '/segment',
        description: "Segments display a group of related buttons, sometimes known as segmented controls, in a horizontal row. They can be displayed inside of a toolbar or the main content.",
      },
      {
        name: 'select',
        link: '/select',
        description: "Selects are form controls to select an option, or options, from a set of options, similar to a native <select> element. When a user taps the select, a dialog appears with all of the options in a large, easy to select list.",
      },
      {
        name: 'skeleton-text',
        link: '/skeleton-text',
        description: "Skeleton Text is a component for rendering placeholder content. The element will render a gray block at the specified width.",
      },
      {
        name: 'spinner',
        link: '/spinner',
        description: "The Spinner component provides a variety of animated SVG spinners. Spinners are visual indicators that the app is loading content or performing another process that the user needs to wait on.",
      },
      {
        name: 'slides',
        link: '/slides',
        description: "The Slides component is a multi-section container. Each section can be swiped or dragged between. It contains any number of Slide components.",
      },
      {
        name: 'tabsview',
        link: '/tabsview',
        description: "Tabs are a top level navigation component to implement a tab-based navigation. The component is a container of individual Tab components.",
      },
      {
        name: 'text',
        link: '/text',
        description: "The text component is a simple component that can be used to style the text color of any element. The ion-text element should wrap the element in order to change the text color of that element.",
      },
      {
        name: 'thumbnail',
        link: '/thumbnail',
        description: "Thumbnails are square components that usually wrap an image or icon. They can be used to make it easier to display a group of larger images or provide a preview of the full-size image.",
      },
      {
        name: 'toast',
        link: '/toast',
        description: "A Toast is a subtle notification commonly used in modern applications. It can be used to provide feedback about an operation or to display a system message. The toast appears on top of the app's content, and can be dismissed by the app to resume user interaction with the app.",
      },
      {
        name: 'toggle',
        link: '/toggle',
        description: "Toggles change the state of a single option. Toggles can be switched on or off by pressing or swiping them. They can also be checked programmatically by setting the checked property.",
      },
      {
        name: 'toolbar',
        link: '/toolbar',
        description: "Toolbars are positioned above or below content. When a toolbar is placed in an <ion-header> it will appear fixed at the top of the content, and when it is in an <ion-footer> it will appear fixed at the bottom. Fullscreen content will scroll behind a toolbar in a header or footer. When placed within an <ion-content>, toolbars will scroll with the content.",
      },
    ]
  }
}
