/**
 * ESDoc plugin to remove "Updated" timestamps from generated HTML.
 *
 * This plugin hooks into onHandleContent and strips any HTML elements
 * that contain data-ice="updated", as well as the header cell that
 * displays the literal text "Updated". This stabilizes the generated
 * documentation by removing time-varying content.
 */

/**
 * @param {{data: {content: string, fileName: string}}} ev
 */
exports.onHandleContent = function onHandleContent(ev) {
  try {
    const fileName = ev && ev.data && ev.data.fileName;
    if (!fileName || !/\.html?$/.test(fileName)) return;

    let html = ev.data.content || '';

    // Remove any element that has data-ice="updated" (typically a <td> in source.html)
    html = html.replace(/<[^>]*data-ice="updated"[^>]*>[\s\S]*?<\/[^>]+>/g, '');

    // Remove header cell that shows the word "Updated" (hidden in some themes)
    // Limit to <td> or <th> to avoid unintended removals
    html = html.replace(/<(td|th)([^>]*)>\s*Updated\s*<\/\1>/gi, '');

    ev.data.content = html;
  }
  catch (e) {
    // Fail-safe: do not break doc generation; just leave content unchanged
    // eslint-disable-next-line no-console
    console.warn('[esdoc-remove-updated-plugin] Failed to strip updated timestamps for', ev && ev.data && ev.data.fileName, e);
  }
};
