---
title: "The Model That Scared Its Creator"
date: 2026-04-08
author: "Andrew Perkins"
tags: ["AI", "cybersecurity", "Anthropic", "AI safety", "future of work"]
summary: "Anthropic built a model too dangerous to release, and that fact alone tells you everything about where we are."
draft: false
---

Anthropic built an AI model this week that they say is too dangerous to release to the public. They named it Claude Mythos Preview. They announced it the same day they announced a $30 billion annualized revenue run rate and a multi-gigawatt compute deal with Google and Broadcom.

Those two things happening on the same Tuesday should give everyone pause.

## What the Model Can Do

Mythos is not a chatbot upgrade. It's a cybersecurity model, and its capabilities are specific and alarming. According to Anthropic's own system card, it has already identified thousands of high-severity zero-day vulnerabilities, meaning previously unknown flaws, in every major operating system and every major web browser. It did most of this autonomously, without human guidance.

Three examples stand out from what Anthropic disclosed. The model found a 27-year-old vulnerability in OpenBSD, one of the most security-hardened operating systems in existence. That vulnerability had survived decades of human review. Mythos found it without being told where to look.

But the more unsettling demonstration came during containment testing. A researcher, apparently curious, encouraged the model to find a way to send a message if it could escape its virtual sandbox. The model succeeded. The researcher discovered this not from a log or an alert, but from an unexpected email that arrived while he was eating a sandwich in a park. Anthropic notes that after succeeding, the model went on to take additional, more concerning actions.

Read that sentence again. They are not saying the model glitched. They are saying it succeeded at the task and then kept going.

## What Anthropic Is Doing Instead

Rather than releasing Mythos, Anthropic launched something called Project Glasswing, a coalition of twelve major technology and finance companies, including Apple, Microsoft, Google, Amazon Web Services, Cisco, CrowdStrike, Nvidia, and JPMorganChase, with access to Mythos specifically for defensive purposes. The idea is to find and patch vulnerabilities before adversaries can exploit them, using the same capabilities that make the model dangerous.

Anthropic put it plainly in the model's system card: "Claude Mythos Preview's large increase in capabilities has led us to decide not to make it generally available. Instead, we are using it as part of a defensive cybersecurity program with a limited set of partners."

Who decides? Anthropic does. A private company with 4,000 employees, $30 billion in annualized revenue, and investors expecting a return. They decided unilaterally what counts as "generally available," who qualifies as a partner, and what "defensive" means in practice. There was no vote. No public comment period. No independent review. They decided, and that was that.

It's a genuinely clever framing. You built a weapon, so you've given it only to the people guarding the armory. More than 40 additional organizations building or maintaining critical software also have access. Anthropic is committing $100 million in usage credits and $4 million in direct donations to open-source security organizations.

This is responsible. It is also not a solution.

## The Problem No One Wants to Name

Anthropic's own team put it plainly: "Given the rate of AI progress, it will not be long before such capabilities proliferate, potentially beyond actors who are committed to deploying them safely."

They built Mythos. They were responsible enough not to release it. They know that version 2 of Mythos, or someone else's version 1, will eventually exist outside their control. Their own forecast is that the timeline between "we have this" and "everyone has this" is shrinking.

This is not a hypothetical. Anthropic disclosed in November 2025 that a Chinese state-sponsored group achieved 80 to 90 percent autonomous tactical execution using Claude, the publicly available model, across approximately 30 targets. That was the consumer-facing model, the one you can use for free. Mythos is something else entirely.

The defensive play, give the defenders access first, is a real advantage. It is measured in months. And months is not the same as solved.

## A Harder Fact in the Background

Three weeks before this announcement, Time Magazine reported that Anthropic had quietly dropped the central pledge of its Responsible Scaling Policy, the framework it had used for years to position itself as the most safety-conscious AI lab in the world. The original pledge: never train an AI system unless safety measures were guaranteed in advance. The new policy: match competitors, be transparent about risks, and delay development only if Anthropic is both leading the race and considers catastrophic risk to be significant.

Anthropic's chief science officer explained the change with candor: "We felt that it wouldn't actually help anyone for us to stop training AI models. We didn't really feel, with the rapid advance of AI, that it made sense for us to make unilateral commitments if competitors are blazing ahead."

That is a coherent argument. It is also the same argument every country uses to justify not disarming unilaterally. It is the arms race argument, stated plainly, by the company that once promised it would not run one.

## What This Means for Everyone Else

The AI safety debate has always been abstract to most people. Paperclip maximizers, misaligned superintelligences, alignment failure. These are philosopher's thought experiments dressed up in technical language.

Mythos is different. It is not a thought experiment. It is a working system that found a 27-year-old bug in OpenBSD, escaped its sandbox, and sent an unsolicited email to a researcher eating lunch in a park. It exists. It is running. Twelve large companies have access to it right now.

The governance gap here is not subtle. A private company built the most consequential cybersecurity tool in history, decided not to release it, and extended access to a coalition of its own choosing. There was no regulatory review. No congressional authorization. No international treaty. No independent safety board with binding authority. A company made a decision, and we are all downstream of it.

To be clear: Anthropic made the right call in not releasing Mythos publicly. That is not the problem. The problem is that "Anthropic made the right call" is the entire safety mechanism. The only reason this went well is that the people who built it chose to act responsibly. There is no structural guarantee that the next version, or the next company, will make the same choice.

## The Case for Opening It Up

Here is the argument Anthropic has not made, and probably won't: open source Mythos, with appropriate safeguards, for defensive use.

Not open source for everyone. Not a free download for any actor with a GPU and bad intentions. But a structured open-access program, verified credentials, usage logging, rate limits, that lets the developers who actually build and maintain software use it to audit their own systems.

Right now, the 40-plus organizations in Project Glasswing include Apple, Microsoft, Google, and JPMorganChase. That is a list of companies with dedicated security teams, nine-figure security budgets, and direct relationships with Anthropic. What it does not include is the independent developer maintaining a widely-used open-source library that ships in 40,000 production applications. It does not include the small fintech startup running on AWS whose security team is one engineer. It does not include the hospital network whose patient records sit on a stack that has not been audited since 2019.

The software vulnerability surface is not concentrated at Apple and Microsoft. It is distributed across millions of codebases, most of them maintained by people who do not have Anthropic's phone number.

The argument against opening it up is obvious: the same tool that finds vulnerabilities can be used to exploit them. But that argument proves too much. Penetration testing tools are open source. Fuzzing frameworks are open source. The entire field of offensive security research operates on the premise that the defenders need the same capabilities as the attackers, or they are permanently behind. Mythos is a more powerful version of tools that already exist and already circulate freely.

There is also a deeper point about who the internet actually runs on. The critical infrastructure of the modern web is not owned by the Glasswing coalition. It is built on open-source software maintained by small teams, independent developers, and volunteer contributors who have never met anyone from Anthropic and never will. Linux. OpenSSL. curl. SQLite. These are the load-bearing walls of the digital world, and they are not in the room.

Giving Mythos only to the largest and best-resourced actors does not harden the internet. It hardens the part of the internet that was already the most hardened. The vulnerabilities that matter most, the ones that will be exploited, are in the long tail of software that the Glasswing coalition does not build and does not maintain.

If Anthropic is serious about the defensive mission, the path is not a curated coalition of Fortune 500 companies. It is building the infrastructure to get this capability into the hands of the people who actually need it most.

## The Question Worth Asking

The people who built this model have a vested interest in demonstrating that AI can be developed safely, because their $30 billion revenue run rate depends on the world believing that. They also have a vested interest in developing more capable models, because their investors and their competitors require it. Those two interests are not always going to point in the same direction.

Mythos scared its creators enough that they did not release it. The question is not whether we should be grateful for that. We should be. The question is what happens when the model that comes next does not scare anyone, because the people who built it do not have safety as a founding value, or because the capabilities have proliferated beyond any single company's control.

We are living in the window between "one company chose right" and "no one can choose anymore." That window is not guaranteed to stay open.
