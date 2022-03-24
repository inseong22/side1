"""Hello Analytics Reporting API V4."""

from apiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import json

SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']
KEY_FILE_LOCATION = './client_secrets.json'
VIEW_ID = '256626925'
FILE_PATH = './gadata.json'

cred = credentials.Certificate("./kiwi.json")
firebase_admin.initialize_app(cred, {
    'projectId': 'kiwi-d5dd3',
})

db = firestore.client()
coll_ref = db.collection('gadata')


def initialize_analyticsreporting():
    """Initializes an Analytics Reporting API V4 service object.

    Returns:
      An authorized Analytics Reporting API V4 service object.
    """
    credentials = ServiceAccountCredentials.from_json_keyfile_name(
        KEY_FILE_LOCATION, SCOPES)

    # Build the service object.
    analytics = build('analyticsreporting', 'v4', credentials=credentials)

    return analytics


def get_report(analytics):
    """Queries the Analytics Reporting API V4.

    Args:
      analytics: An authorized Analytics Reporting API V4 service object.
    Returns:
      The Analytics Reporting API V4 response.
    """
    return analytics.reports().batchGet(
        body={
            'reportRequests': [
                {
                    'viewId': VIEW_ID,
                    'dateRanges': [{
                        'startDate': '30daysAgo',
                        'endDate': 'today'
                    }],
                    'metrics': [
                        {'expression': 'ga:pageViews'},
                        {'expression': 'ga:avgSessionDuration'},
                        {'expression': 'ga:users'},
                        {'expression': 'ga:newUsers'},
                        {'expression': 'ga:sessions'},
                    ],
                    'dimensions': [
                        {'name': 'ga:pagePath'}
                    ]
                    # dimensions?~W~P ?~U??~K??~U~X?~J~T 카?~E~L?| 리?~W~P?~D~\
                    # metrics?~]~X ?~R?~]??~K?.
                }]
        }
    ).execute()


def print_response(response):
    """Parses and prints the Analytics Reporting API V4 response.

    Args:
      response: An Analytics Reporting API V4 response.
    """
    for report in response.get('reports', []):
        columnHeader = report.get('columnHeader', {})
        dimensionHeaders = columnHeader.get('dimensions', [])
        metricHeaders = columnHeader.get(
            'metricHeader', {}).get('metricHeaderEntries', [])
        tempDimension = []
        for row in report.get('data', {}).get('rows', []):
            dimensions = row.get('dimensions', [])
            dateRangeValues = row.get('metrics', [])

            tempNum = 0
            tempMetric = []

            for header, dimension in zip(dimensionHeaders, dimensions):
                # ?~]?건 ?~T~T?~X?~E~X : pagePath, fullReferrer ?~S??~]? 보?~W??~P
                tempMetric.append([header, dimension])

            for i, values in enumerate(dateRangeValues):
                for metricHeader, value in zip(metricHeaders, values.get('values')):
                    # ?~]?건 매?~J?릭 : users, sessions ?~S??~]? 보?~W??~P
                    tempMetric.append([metricHeader.get('name'), value])
            tempDimension.append(tempMetric)

        result = []
        for onePath in tempDimension:
            temp = {}
            for oneMetric in onePath:
                if oneMetric[0] == 'ga:pageViews':
                    temp['pageViews'] = oneMetric[1]
                if oneMetric[0] == 'ga:avgSessionDuration':
                    temp['avgSessionDuration'] = oneMetric[1]
                if oneMetric[0] == 'ga:users':
                    temp['users'] = oneMetric[1]
                if oneMetric[0] == 'ga:newUsers':
                    temp['newUsers'] = oneMetric[1]
                if oneMetric[0] == 'ga:sessions':
                    temp['sessions'] = oneMetric[1]
                if oneMetric[0] == 'ga:pagePath':
                    temp['path'] = oneMetric[1]

            doc_ref = coll_ref.document()
            doc_ref.set(temp)
            result.append(temp)
            temp = []
        return result


def delete_collection(coll_ref):
    docs = coll_ref.stream()
    for doc in docs:
        doc.reference.delete()


def main():
    delete_collection(coll_ref)
    analytics = initialize_analyticsreporting()
    response = get_report(analytics)
    result = print_response(response)
    print(result)
    with open(FILE_PATH, 'w') as f:
        json.dump(result, f)
    print("?~K??~V~I?~P?")


if __name__ == '__main__':
    main()
