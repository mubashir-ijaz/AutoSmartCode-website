# Google Apps Script — handling both forms

The site now sends **two** kinds of submission to the same Apps Script URL:

| Form | `formType` | Fields sent |
|---|---|---|
| Contact form | *(absent)* | `name, email, whatsapp, company, service, budget, message, date` |
| Feedback form | `feedback` | `name, company, role, email, rating, message, formType, date` |

Both are sent as a **GET** request with query-string parameters.

`whatsapp` is optional. Until the script below is deployed it is ignored by
the sheet, so the site also appends `WhatsApp: <number>` to `message` — the
number reaches the sheet either way. `budget` holds "which sites do you buy on".

If your Leads sheet already exists, insert a **WhatsApp** column after Email
by hand so the old rows line up with the new ones.

Replace your Apps Script `doGet` with the version below. It writes contact
submissions to a sheet named **Leads** and feedback to a sheet named
**Feedback**, creating either one if it doesn't exist yet.

```javascript
function doGet(e) {
  var p = e.parameter;
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (p.formType === 'feedback') {
    var fb = ss.getSheetByName('Feedback');
    if (!fb) {
      fb = ss.insertSheet('Feedback');
      fb.appendRow(['Date', 'Name', 'Company', 'Role', 'Email', 'Rating', 'Feedback', 'Approved?']);
    }
    fb.appendRow([
      p.date || new Date(),
      p.name || '',
      p.company || '',
      p.role || '',
      p.email || '',
      p.rating || '',
      p.message || '',
      'NO'            // flip to YES once you've chosen to publish it
    ]);
  } else {
    var leads = ss.getSheetByName('Leads');
    if (!leads) {
      leads = ss.insertSheet('Leads');
      leads.appendRow(['Date', 'Name', 'Email', 'WhatsApp', 'Company', 'Service', 'Sites', 'Message']);
    }
    leads.appendRow([
      p.date || new Date(),
      p.name || '',
      p.email || '',
      p.whatsapp || '',
      p.company || '',
      p.service || '',
      p.budget || '',
      p.message || ''
    ]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Deploying the change

1. Open your Apps Script project (the one behind `APPS_SCRIPT_URL` in
   `src/pages/Home.jsx`).
2. Paste the code above over the existing `doGet`.
3. **Deploy → Manage deployments → edit the active deployment → New version → Deploy.**
   Editing the code alone is not enough; a new version must be deployed or the
   live URL keeps running the old code.
4. Keep "Who has access" set to **Anyone**, or the browser request will fail.

## Optional: email yourself on new feedback

Add this just before the `return` to get notified:

```javascript
if (p.formType === 'feedback') {
  MailApp.sendEmail(
    'sam@autosmartcode.com',
    'New feedback: ' + (p.rating || '?') + '/5 from ' + (p.name || 'someone'),
    p.message || ''
  );
}
```

## Note on the "Approved?" column

Feedback does **not** appear on the website automatically — it only lands in the
sheet. To publish one, copy it into the `TESTIMONIALS` array in
`src/pages/Home.jsx`. The `Approved?` column is just there to help you track
which ones you've already used.
