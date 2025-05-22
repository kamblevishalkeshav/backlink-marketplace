# Backlink Marketplace Listing Import Template

## Instructions

1. Fill out all required fields (marked with *) in the Excel sheet
2. Optional fields can be left blank if not applicable
3. Save the file as .xlsx or .csv format
4. Import the file through the admin panel
5. The system will validate all entries before importing

## Excel Template Structure

| Column Name | Description | Format | Required | Example |
|-------------|-------------|--------|----------|---------|
| domain* | Website domain | Text | Yes | example.com |
| price* | Listing price in USD | Number | Yes | 150 |
| offer_rate | Discount rate (if any) | Number (0-100) | No | 10 |
| listing_type* | Type of listing | Text (One of: guest-post, homepage-link, innerpage-link, sitewide-link) | Yes | guest-post |
| is_permanent* | Whether the link is permanent | Boolean (TRUE/FALSE) | Yes | TRUE |
| months | Number of months (if not permanent) | Number | No | 6 |
| word_count* | Number of words | Number | Yes | 500 |
| working_days* | Number of days to complete | Number | Yes | 3 |
| content_writer* | Who writes content | Text (One of: both, buyer, publisher) | Yes | both |
| primary_language* | Primary language | Text | Yes | en |
| native_language* | Native language | Text | Yes | en |
| extra_language | Additional language | Text | No | es |
| category* | Website category | Text | Yes | Technology |
| country_code* | Main country code | Text (ISO 2-letter) | Yes | US |
| da* | Domain Authority | Number (0-100) | Yes | 45 |
| dr_value* | Domain Rating value | Number (0-100) | Yes | 50 |
| dr_percentage* | Domain Rating percentage | Text | Yes | +5% |
| as_value* | Authority Score | Number (0-100) | Yes | 55 |
| traffic* | Monthly traffic | Number | Yes | 10000 |
| keywords* | Number of keywords | Number | Yes | 500 |
| ref_domains* | Number of referring domains | Number | Yes | 200 |
| niches* | Niche categories | Text (comma-separated) | Yes | technology,software,ai |
| publisher_note | Additional notes | Text | No | Fast turnaround time |
| accept_casino | Accept casino content | Text (One of: accepted, not-accepted, prohibited) | No | not-accepted |
| accept_finance | Accept finance content | Text (One of: accepted, not-accepted, prohibited) | No | accepted |
| accept_erotic | Accept adult content | Text (One of: accepted, not-accepted, prohibited) | No | prohibited |
| accept_dating | Accept dating content | Text (One of: accepted, not-accepted, prohibited) | No | not-accepted |
| accept_crypto | Accept crypto content | Text (One of: accepted, not-accepted, prohibited) | No | accepted |
| accept_cbd | Accept CBD content | Text (One of: accepted, not-accepted, prohibited) | No | not-accepted |
| accept_medicine | Accept medicine content | Text (One of: accepted, not-accepted, prohibited) | No | not-accepted |
| country1_code | Traffic country 1 code | Text (ISO 2-letter) | No | US |
| country1_percentage | Traffic country 1 percentage | Number (0-100) | No | 60 |
| country1_traffic | Traffic country 1 visitors | Number | No | 6000 |
| country2_code | Traffic country 2 code | Text (ISO 2-letter) | No | GB |
| country2_percentage | Traffic country 2 percentage | Number (0-100) | No | 20 |
| country2_traffic | Traffic country 2 visitors | Number | No | 2000 |
| country3_code | Traffic country 3 code | Text (ISO 2-letter) | No | CA |
| country3_percentage | Traffic country 3 percentage | Number (0-100) | No | 10 |
| country3_traffic | Traffic country 3 visitors | Number | No | 1000 |
| country4_code | Traffic country 4 code | Text (ISO 2-letter) | No | AU |
| country4_percentage | Traffic country 4 percentage | Number (0-100) | No | 5 |
| country4_traffic | Traffic country 4 visitors | Number | No | 500 |
| country5_code | Traffic country 5 code | Text (ISO 2-letter) | No | DE |
| country5_percentage | Traffic country 5 percentage | Number (0-100) | No | 5 |
| country5_traffic | Traffic country 5 visitors | Number | No | 500 |

## Notes

- Ensure the total of all country traffic percentages does not exceed 100%
- The listing will be created with "PENDING" status by default
- Make sure domain names are entered without "http://" or "https://"
- For multiple niches, separate them with commas without spaces (e.g., "technology,software,ai")
- All fields marked with * are required for successful import 