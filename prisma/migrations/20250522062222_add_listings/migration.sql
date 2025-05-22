-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('GUEST_POST', 'HOMEPAGE_LINK', 'INNERPAGE_LINK', 'SITEWIDE_LINK');

-- CreateEnum
CREATE TYPE "ContentWriterType" AS ENUM ('BOTH', 'YOU', 'PUBLISHER');

-- CreateEnum
CREATE TYPE "ContentAcceptanceStatus" AS ENUM ('ACCEPTED', 'NOT_ACCEPTED', 'PROHIBITED');

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "offerRate" DOUBLE PRECISION,
    "domain" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "listingType" "ListingType" NOT NULL,
    "permanent" BOOLEAN NOT NULL,
    "months" INTEGER,
    "wordCount" INTEGER NOT NULL,
    "workingDays" INTEGER NOT NULL,
    "contentWriter" "ContentWriterType" NOT NULL,
    "primaryLanguage" TEXT NOT NULL,
    "nativeLanguage" TEXT NOT NULL,
    "extraLanguage" TEXT,
    "category" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "da" INTEGER NOT NULL,
    "drValue" INTEGER NOT NULL,
    "drPercentage" TEXT NOT NULL,
    "as" INTEGER NOT NULL,
    "traffic" INTEGER NOT NULL,
    "keywords" INTEGER NOT NULL,
    "refDomains" INTEGER NOT NULL,
    "niches" TEXT[],
    "publisherNote" TEXT,
    "status" "ListingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountryTraffic" (
    "id" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "traffic" INTEGER,
    "listingId" TEXT NOT NULL,

    CONSTRAINT "CountryTraffic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcceptedContent" (
    "id" TEXT NOT NULL,
    "casino" "ContentAcceptanceStatus" DEFAULT 'NOT_ACCEPTED',
    "finance" "ContentAcceptanceStatus" DEFAULT 'NOT_ACCEPTED',
    "erotic" "ContentAcceptanceStatus" DEFAULT 'NOT_ACCEPTED',
    "dating" "ContentAcceptanceStatus" DEFAULT 'NOT_ACCEPTED',
    "crypto" "ContentAcceptanceStatus" DEFAULT 'NOT_ACCEPTED',
    "cbd" "ContentAcceptanceStatus" DEFAULT 'NOT_ACCEPTED',
    "medicine" "ContentAcceptanceStatus" DEFAULT 'NOT_ACCEPTED',
    "listingId" TEXT NOT NULL,

    CONSTRAINT "AcceptedContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AcceptedContent_listingId_key" ON "AcceptedContent"("listingId");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountryTraffic" ADD CONSTRAINT "CountryTraffic_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcceptedContent" ADD CONSTRAINT "AcceptedContent_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
